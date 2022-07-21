/**
 * The $N Multistroke Recognizer (JavaScript version)
 *
 *  Lisa Anthony, Ph.D.
 *  UMBC
 *  Information Systems Department
 *  1000 Hilltop Circle
 *  Baltimore, MD 21250
 *  lanthony@umbc.edu
 *
 *  Jacob O. Wobbrock, Ph.D.
 *  The Information School
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  wobbrock@uw.edu
 *
 * The academic publications for the $N recognizer, and what should be
 * used to cite it, are:
 *
 *     Anthony, L. and Wobbrock, J.O. (2010). A lightweight multistroke
 *     recognizer for user interface prototypes. Proceedings of Graphics
 *     Interface (GI '10). Ottawa, Ontario (May 31-June 2, 2010). Toronto,
 *     Ontario: Canadian Information Processing Society, pp. 245-252.
 *     https://dl.acm.org/citation.cfm?id=1839258
 *
 *     Anthony, L. and Wobbrock, J.O. (2012). $N-Protractor: A fast and
 *     accurate multistroke recognizer. Proceedings of Graphics Interface
 *     (GI '12). Toronto, Ontario (May 28-30, 2012). Toronto, Ontario:
 *     Canadian Information Processing Society, pp. 117-120.
 *     https://dl.acm.org/citation.cfm?id=2305296
 *
 * The Protractor enhancement was separately published by Yang Li and programmed
 * here by Jacob O. Wobbrock and Lisa Anthony:
 *
 *     Li, Y. (2010). Protractor: A fast and accurate gesture
 *     recognizer. Proceedings of the ACM Conference on Human
 *     Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *     (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *     https://dl.acm.org/citation.cfm?id=1753654
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2011, Jacob O. Wobbrock and Lisa Anthony.
 * All rights reserved. Last updated July 14, 2018.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of UMBC nor the University of Washington,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Lisa Anthony OR Jacob O. Wobbrock
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
**/
//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, useBoundedRotationInvariance, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleDimTo(this.Points, SquareSize, OneDThreshold);
	if (useBoundedRotationInvariance)
		this.Points = RotateBy(this.Points, +radians); // restore
	this.Points = TranslateTo(this.Points, Origin);
	this.StartUnitVector = CalcStartUnitVector(this.Points, StartAngleIndex);
	this.Vector = Vectorize(this.Points, useBoundedRotationInvariance); // for Protractor
}
//
// Multistroke class: a container for unistrokes
//
function Multistroke(name, useBoundedRotationInvariance, strokes) // constructor
{
	this.Name = name;
	this.strokes = strokes
	
	this.NumStrokes = strokes.length; // number of individual strokes

	var order = new Array(strokes.length); // array of integer indices
	for (var i = 0; i < strokes.length; i++)
		order[i] = i; // initialize
	var orders = new Array(); // array of integer arrays
	HeapPermute(strokes.length, order, /*out*/ orders);

	var unistrokes = MakeUnistrokes(strokes, orders); // returns array of point arrays
	this.Unistrokes = new Array(unistrokes.length); // unistrokes for this multistroke
	for (var j = 0; j < unistrokes.length; j++)
		this.Unistrokes[j] = new Unistroke(name, useBoundedRotationInvariance, unistrokes[j]);
}
//
// Result class
//
function Result(name, score, ms) // constructor
{
	this.Name = name;
	this.Score = score;
	this.Time = ms;
}
//
// NDollarRecognizer constants
//
const NumMultistrokes = 4;
const NumPoints = 96;
const SquareSize = 250.0;
const OneDThreshold = 0.25; // customize to desired gesture set (usually 0.20 - 0.35)
const Origin = new Point(0,0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
const StartAngleIndex = (NumPoints / 8); // eighth of gesture length
const AngleSimilarityThreshold = Deg2Rad(30.0);

const circle = [
    {
        "X": 490,
        "Y": 397
    },
    {
        "X": 492,
        "Y": 397
    },
    {
        "X": 494,
        "Y": 397
    },
    {
        "X": 496,
        "Y": 397
    },
    {
        "X": 498,
        "Y": 397
    },
    {
        "X": 500,
        "Y": 397
    },
    {
        "X": 502,
        "Y": 398
    },
    {
        "X": 504,
        "Y": 398
    },
    {
        "X": 506,
        "Y": 398
    },
    {
        "X": 508,
        "Y": 399
    },
    {
        "X": 510,
        "Y": 399
    },
    {
        "X": 514,
        "Y": 399
    },
    {
        "X": 516,
        "Y": 399
    },
    {
        "X": 520,
        "Y": 399
    },
    {
        "X": 522,
        "Y": 399
    },
    {
        "X": 524,
        "Y": 399
    },
    {
        "X": 526,
        "Y": 399
    },
    {
        "X": 530,
        "Y": 399
    },
    {
        "X": 532,
        "Y": 399
    },
    {
        "X": 535,
        "Y": 399
    },
    {
        "X": 538,
        "Y": 399
    },
    {
        "X": 540,
        "Y": 399
    },
    {
        "X": 544,
        "Y": 399
    },
    {
        "X": 546,
        "Y": 399
    },
    {
        "X": 548,
        "Y": 399
    },
    {
        "X": 550,
        "Y": 399
    },
    {
        "X": 552,
        "Y": 398
    },
    {
        "X": 554,
        "Y": 398
    },
    {
        "X": 555,
        "Y": 397
    },
    {
        "X": 556,
        "Y": 397
    },
    {
        "X": 558,
        "Y": 395
    },
    {
        "X": 560,
        "Y": 395
    },
    {
        "X": 560,
        "Y": 393
    },
    {
        "X": 562,
        "Y": 392
    },
    {
        "X": 562,
        "Y": 390
    },
    {
        "X": 563,
        "Y": 389
    },
    {
        "X": 563,
        "Y": 387
    },
    {
        "X": 563,
        "Y": 385
    },
    {
        "X": 563,
        "Y": 383
    },
    {
        "X": 562,
        "Y": 381
    },
    {
        "X": 562,
        "Y": 380
    },
    {
        "X": 560,
        "Y": 378
    },
    {
        "X": 558,
        "Y": 377
    },
    {
        "X": 557,
        "Y": 377
    },
    {
        "X": 555,
        "Y": 376
    },
    {
        "X": 554,
        "Y": 375
    },
    {
        "X": 552,
        "Y": 374
    },
    {
        "X": 550,
        "Y": 373
    },
    {
        "X": 548,
        "Y": 373
    },
    {
        "X": 546,
        "Y": 371
    },
    {
        "X": 544,
        "Y": 371
    },
    {
        "X": 540,
        "Y": 370
    },
    {
        "X": 538,
        "Y": 369
    },
    {
        "X": 534,
        "Y": 368
    },
    {
        "X": 530,
        "Y": 367
    },
    {
        "X": 527,
        "Y": 366
    },
    {
        "X": 524,
        "Y": 366
    },
    {
        "X": 522,
        "Y": 365
    },
    {
        "X": 519,
        "Y": 365
    },
    {
        "X": 516,
        "Y": 363
    },
    {
        "X": 512,
        "Y": 363
    },
    {
        "X": 508,
        "Y": 362
    },
    {
        "X": 504,
        "Y": 361
    },
    {
        "X": 500,
        "Y": 361
    },
    {
        "X": 498,
        "Y": 360
    },
    {
        "X": 495,
        "Y": 360
    },
    {
        "X": 492,
        "Y": 359
    },
    {
        "X": 490,
        "Y": 359
    },
    {
        "X": 486,
        "Y": 359
    },
    {
        "X": 484,
        "Y": 359
    },
    {
        "X": 482,
        "Y": 360
    },
    {
        "X": 480,
        "Y": 361
    },
    {
        "X": 478,
        "Y": 361
    },
    {
        "X": 476,
        "Y": 362
    },
    {
        "X": 474,
        "Y": 363
    },
    {
        "X": 472,
        "Y": 365
    },
    {
        "X": 470,
        "Y": 365
    },
    {
        "X": 468,
        "Y": 367
    },
    {
        "X": 466,
        "Y": 369
    },
    {
        "X": 464,
        "Y": 370
    },
    {
        "X": 464,
        "Y": 371
    },
    {
        "X": 462,
        "Y": 373
    },
    {
        "X": 461,
        "Y": 375
    },
    {
        "X": 460,
        "Y": 376
    },
    {
        "X": 458,
        "Y": 379
    },
    {
        "X": 457,
        "Y": 381
    },
    {
        "X": 457,
        "Y": 383
    },
    {
        "X": 456,
        "Y": 385
    },
    {
        "X": 456,
        "Y": 387
    },
    {
        "X": 456,
        "Y": 389
    },
    {
        "X": 456,
        "Y": 391
    },
    {
        "X": 457,
        "Y": 393
    },
    {
        "X": 458,
        "Y": 395
    },
    {
        "X": 460,
        "Y": 396
    },
    {
        "X": 462,
        "Y": 397
    },
    {
        "X": 464,
        "Y": 397
    },
    {
        "X": 466,
        "Y": 398
    },
    {
        "X": 468,
        "Y": 399
    },
    {
        "X": 471,
        "Y": 399
    },
    {
        "X": 475,
        "Y": 400
    },
    {
        "X": 479,
        "Y": 400
    },
    {
        "X": 484,
        "Y": 401
    },
    {
        "X": 487,
        "Y": 402
    },
    {
        "X": 490,
        "Y": 402
    },
    {
        "X": 492,
        "Y": 403
    },
    {
        "X": 496,
        "Y": 403
    },
    {
        "X": 499,
        "Y": 403
    },
    {
        "X": 502,
        "Y": 403
    },
    {
        "X": 504,
        "Y": 403
    },
    {
        "X": 506,
        "Y": 403
    },
    {
        "X": 510,
        "Y": 403
    },
    {
        "X": 512,
        "Y": 403
    },
    {
        "X": 515,
        "Y": 403
    },
    {
        "X": 518,
        "Y": 403
    },
    {
        "X": 520,
        "Y": 401
    },
    {
        "X": 521,
        "Y": 401
    },
    {
        "X": 522,
        "Y": 400
    },
    {
        "X": 523,
        "Y": 399
    },
    {
        "X": 524,
        "Y": 398
    },
    {
        "X": 526,
        "Y": 397
    },
    {
        "X": 527,
        "Y": 397
    }
]

const waves1= [
    {
        "X": 286,
        "Y": 525
    },
    {
        "X": 286,
        "Y": 525
    },
    {
        "X": 287,
        "Y": 525
    },
    {
        "X": 288,
        "Y": 525
    },
    {
        "X": 288,
        "Y": 525
    },
    {
        "X": 289,
        "Y": 525
    },
    {
        "X": 290,
        "Y": 525
    },
    {
        "X": 290,
        "Y": 525
    },
    {
        "X": 291,
        "Y": 525
    },
    {
        "X": 292,
        "Y": 525
    },
    {
        "X": 292,
        "Y": 525
    },
    {
        "X": 293,
        "Y": 525
    },
    {
        "X": 294,
        "Y": 525
    },
    {
        "X": 294,
        "Y": 525
    },
    {
        "X": 295,
        "Y": 525
    },
    {
        "X": 296,
        "Y": 525
    },
    {
        "X": 296,
        "Y": 525
    },
    {
        "X": 297,
        "Y": 525
    },
    {
        "X": 298,
        "Y": 525
    },
    {
        "X": 298,
        "Y": 525
    },
    {
        "X": 299,
        "Y": 525
    },
    {
        "X": 300,
        "Y": 525
    },
    {
        "X": 300,
        "Y": 525
    },
    {
        "X": 301,
        "Y": 525
    },
    {
        "X": 302,
        "Y": 525
    },
    {
        "X": 302,
        "Y": 525
    },
    {
        "X": 303,
        "Y": 525
    },
    {
        "X": 304,
        "Y": 525
    },
    {
        "X": 304,
        "Y": 525
    },
    {
        "X": 305,
        "Y": 525
    },
    {
        "X": 306,
        "Y": 525
    },
    {
        "X": 306,
        "Y": 525
    },
    {
        "X": 307,
        "Y": 525
    },
    {
        "X": 308,
        "Y": 525
    },
    {
        "X": 308,
        "Y": 525
    },
    {
        "X": 309,
        "Y": 525
    },
    {
        "X": 310,
        "Y": 525
    },
    {
        "X": 310,
        "Y": 525
    },
    {
        "X": 311,
        "Y": 525
    },
    {
        "X": 312,
        "Y": 525
    },
    {
        "X": 312,
        "Y": 525
    },
    {
        "X": 313,
        "Y": 525
    },
    {
        "X": 314,
        "Y": 525
    },
    {
        "X": 314,
        "Y": 525
    },
    {
        "X": 315,
        "Y": 525
    },
    {
        "X": 316,
        "Y": 525
    },
    {
        "X": 316,
        "Y": 525
    },
    {
        "X": 317,
        "Y": 525
    },
    {
        "X": 318,
        "Y": 525
    },
    {
        "X": 318,
        "Y": 525
    },
    {
        "X": 319,
        "Y": 525
    },
    {
        "X": 320,
        "Y": 525
    },
    {
        "X": 320,
        "Y": 525
    },
    {
        "X": 321,
        "Y": 525
    },
    {
        "X": 322,
        "Y": 525
    },
    {
        "X": 322,
        "Y": 525
    },
    {
        "X": 323,
        "Y": 525
    },
    {
        "X": 324,
        "Y": 525
    },
    {
        "X": 324,
        "Y": 525
    },
    {
        "X": 325,
        "Y": 525
    },
    {
        "X": 326,
        "Y": 525
    },
    {
        "X": 326,
        "Y": 525
    },
    {
        "X": 327,
        "Y": 525
    },
    {
        "X": 328,
        "Y": 525
    },
    {
        "X": 328,
        "Y": 525
    },
    {
        "X": 329,
        "Y": 525
    },
    {
        "X": 330,
        "Y": 525
    },
    {
        "X": 330,
        "Y": 525
    },
    {
        "X": 331,
        "Y": 525
    }
]

const waves2= [
    {
        "X": 105,
        "Y": 472
    },
    {
        "X": 107,
        "Y": 472
    },
    {
        "X": 109,
        "Y": 472
    },
    {
        "X": 111,
        "Y": 472
    },
    {
        "X": 113,
        "Y": 472
    },
    {
        "X": 115,
        "Y": 472
    },
    {
        "X": 117,
        "Y": 472
    },
    {
        "X": 119,
        "Y": 472
    },
    {
        "X": 121,
        "Y": 472
    },
    {
        "X": 124,
        "Y": 472
    },
    {
        "X": 126,
        "Y": 472
    },
    {
        "X": 128,
        "Y": 472
    },
    {
        "X": 131,
        "Y": 472
    },
    {
        "X": 134,
        "Y": 472
    },
    {
        "X": 136,
        "Y": 472
    },
    {
        "X": 138,
        "Y": 472
    },
    {
        "X": 141,
        "Y": 472
    },
    {
        "X": 143,
        "Y": 472
    },
    {
        "X": 146,
        "Y": 472
    },
    {
        "X": 148,
        "Y": 472
    },
    {
        "X": 150,
        "Y": 472
    },
    {
        "X": 152,
        "Y": 472
    },
    {
        "X": 154,
        "Y": 473
    },
    {
        "X": 156,
        "Y": 473
    },
    {
        "X": 158,
        "Y": 473
    },
    {
        "X": 160,
        "Y": 473
    },
    {
        "X": 162,
        "Y": 473
    },
    {
        "X": 164,
        "Y": 473
    },
    {
        "X": 166,
        "Y": 473
    },
    {
        "X": 168,
        "Y": 473
    },
    {
        "X": 170,
        "Y": 473
    },
    {
        "X": 172,
        "Y": 473
    },
    {
        "X": 174,
        "Y": 473
    },
    {
        "X": 177,
        "Y": 473
    },
    {
        "X": 179,
        "Y": 473
    },
    {
        "X": 181,
        "Y": 473
    },
    {
        "X": 184,
        "Y": 473
    },
    {
        "X": 187,
        "Y": 473
    },
    {
        "X": 189,
        "Y": 473
    },
    {
        "X": 192,
        "Y": 473
    },
    {
        "X": 194,
        "Y": 473
    },
    {
        "X": 196,
        "Y": 473
    },
    {
        "X": 200,
        "Y": 473
    },
    {
        "X": 204,
        "Y": 472
    },
    {
        "X": 206,
        "Y": 472
    },
    {
        "X": 210,
        "Y": 472
    },
    {
        "X": 214,
        "Y": 472
    },
    {
        "X": 217,
        "Y": 472
    },
    {
        "X": 220,
        "Y": 471
    },
    {
        "X": 226,
        "Y": 471
    },
    {
        "X": 230,
        "Y": 471
    },
    {
        "X": 232,
        "Y": 471
    },
    {
        "X": 237,
        "Y": 471
    },
    {
        "X": 240,
        "Y": 471
    },
    {
        "X": 243,
        "Y": 471
    },
    {
        "X": 246,
        "Y": 471
    },
    {
        "X": 248,
        "Y": 471
    },
    {
        "X": 250,
        "Y": 471
    },
    {
        "X": 252,
        "Y": 471
    },
    {
        "X": 254,
        "Y": 471
    },
    {
        "X": 256,
        "Y": 471
    },
    {
        "X": 258,
        "Y": 471
    },
    {
        "X": 260,
        "Y": 471
    },
    {
        "X": 262,
        "Y": 471
    },
    {
        "X": 264,
        "Y": 471
    },
    {
        "X": 266,
        "Y": 471
    },
    {
        "X": 268,
        "Y": 471
    },
    {
        "X": 270,
        "Y": 471
    },
    {
        "X": 272,
        "Y": 471
    },
    {
        "X": 274,
        "Y": 471
    },
    {
        "X": 276,
        "Y": 471
    },
    {
        "X": 278,
        "Y": 471
    },
    {
        "X": 280,
        "Y": 471
    },
    {
        "X": 282,
        "Y": 471
    },
    {
        "X": 284,
        "Y": 472
    },
    {
        "X": 286,
        "Y": 472
    },
    {
        "X": 288,
        "Y": 472
    },
    {
        "X": 290,
        "Y": 472
    },
    {
        "X": 292,
        "Y": 472
    },
    {
        "X": 294,
        "Y": 472
    },
    {
        "X": 296,
        "Y": 472
    },
    {
        "X": 298,
        "Y": 473
    },
    {
        "X": 300,
        "Y": 473
    },
    {
        "X": 302,
        "Y": 473
    },
    {
        "X": 304,
        "Y": 473
    },
    {
        "X": 306,
        "Y": 473
    },
    {
        "X": 308,
        "Y": 473
    },
    {
        "X": 310,
        "Y": 473
    },
    {
        "X": 312,
        "Y": 473
    },
    {
        "X": 315,
        "Y": 473
    },
    {
        "X": 317,
        "Y": 474
    },
    {
        "X": 319,
        "Y": 474
    },
    {
        "X": 321,
        "Y": 474
    },
    {
        "X": 323,
        "Y": 474
    },
    {
        "X": 325,
        "Y": 474
    },
    {
        "X": 327,
        "Y": 474
    },
    {
        "X": 330,
        "Y": 474
    },
    {
        "X": 332,
        "Y": 474
    },
    {
        "X": 334,
        "Y": 474
    },
    {
        "X": 336,
        "Y": 474
    },
    {
        "X": 337,
        "Y": 475
    },
    {
        "X": 339,
        "Y": 475
    },
    {
        "X": 341,
        "Y": 475
    },
    {
        "X": 343,
        "Y": 475
    },
    {
        "X": 345,
        "Y": 475
    },
    {
        "X": 347,
        "Y": 475
    },
    {
        "X": 349,
        "Y": 475
    },
    {
        "X": 351,
        "Y": 475
    },
    {
        "X": 353,
        "Y": 475
    },
    {
        "X": 355,
        "Y": 475
    },
    {
        "X": 357,
        "Y": 475
    },
    {
        "X": 359,
        "Y": 475
    },
    {
        "X": 361,
        "Y": 475
    },
    {
        "X": 363,
        "Y": 476
    },
    {
        "X": 365,
        "Y": 476
    },
    {
        "X": 367,
        "Y": 476
    },
    {
        "X": 369,
        "Y": 476
    },
    {
        "X": 372,
        "Y": 476
    },
    {
        "X": 374,
        "Y": 476
    },
    {
        "X": 376,
        "Y": 476
    },
    {
        "X": 378,
        "Y": 476
    },
    {
        "X": 380,
        "Y": 476
    },
    {
        "X": 382,
        "Y": 476
    },
    {
        "X": 384,
        "Y": 476
    },
    {
        "X": 387,
        "Y": 476
    },
    {
        "X": 389,
        "Y": 476
    },
    {
        "X": 391,
        "Y": 476
    },
    {
        "X": 393,
        "Y": 476
    },
    {
        "X": 395,
        "Y": 476
    },
    {
        "X": 397,
        "Y": 477
    },
    {
        "X": 399,
        "Y": 477
    },
    {
        "X": 401,
        "Y": 477
    },
    {
        "X": 403,
        "Y": 477
    },
    {
        "X": 405,
        "Y": 477
    },
    {
        "X": 408,
        "Y": 477
    },
    {
        "X": 410,
        "Y": 477
    },
    {
        "X": 412,
        "Y": 477
    },
    {
        "X": 414,
        "Y": 477
    },
    {
        "X": 416,
        "Y": 477
    },
    {
        "X": 418,
        "Y": 477
    },
    {
        "X": 420,
        "Y": 477
    },
    {
        "X": 422,
        "Y": 477
    },
    {
        "X": 424,
        "Y": 477
    },
    {
        "X": 426,
        "Y": 477
    },
    {
        "X": 428,
        "Y": 477
    },
    {
        "X": 430,
        "Y": 477
    },
    {
        "X": 432,
        "Y": 477
    },
    {
        "X": 435,
        "Y": 477
    },
    {
        "X": 437,
        "Y": 477
    },
    {
        "X": 439,
        "Y": 477
    },
    {
        "X": 441,
        "Y": 477
    },
    {
        "X": 443,
        "Y": 477
    },
    {
        "X": 445,
        "Y": 477
    },
    {
        "X": 447,
        "Y": 477
    },
    {
        "X": 449,
        "Y": 477
    },
    {
        "X": 451,
        "Y": 477
    },
    {
        "X": 453,
        "Y": 477
    },
    {
        "X": 455,
        "Y": 477
    },
    {
        "X": 457,
        "Y": 477
    },
    {
        "X": 459,
        "Y": 477
    },
    {
        "X": 461,
        "Y": 477
    },
    {
        "X": 463,
        "Y": 477
    },
    {
        "X": 465,
        "Y": 477
    },
    {
        "X": 467,
        "Y": 477
    },
    {
        "X": 469,
        "Y": 477
    },
    {
        "X": 471,
        "Y": 477
    },
    {
        "X": 473,
        "Y": 477
    },
    {
        "X": 475,
        "Y": 477
    },
    {
        "X": 477,
        "Y": 477
    },
    {
        "X": 479,
        "Y": 477
    },
    {
        "X": 481,
        "Y": 477
    },
    {
        "X": 483,
        "Y": 477
    },
    {
        "X": 485,
        "Y": 477
    },
    {
        "X": 487,
        "Y": 477
    },
    {
        "X": 490,
        "Y": 477
    },
    {
        "X": 492,
        "Y": 477
    },
    {
        "X": 494,
        "Y": 477
    },
    {
        "X": 496,
        "Y": 477
    },
    {
        "X": 498,
        "Y": 477
    },
    {
        "X": 501,
        "Y": 477
    },
    {
        "X": 503,
        "Y": 477
    },
    {
        "X": 506,
        "Y": 477
    },
    {
        "X": 508,
        "Y": 477
    },
    {
        "X": 510,
        "Y": 477
    },
    {
        "X": 512,
        "Y": 477
    },
    {
        "X": 515,
        "Y": 477
    },
    {
        "X": 518,
        "Y": 477
    },
    {
        "X": 520,
        "Y": 477
    },
    {
        "X": 522,
        "Y": 477
    },
    {
        "X": 524,
        "Y": 477
    },
    {
        "X": 526,
        "Y": 477
    },
    {
        "X": 528,
        "Y": 477
    },
    {
        "X": 530,
        "Y": 477
    },
    {
        "X": 532,
        "Y": 477
    },
    {
        "X": 534,
        "Y": 477
    },
    {
        "X": 537,
        "Y": 477
    },
    {
        "X": 539,
        "Y": 477
    },
    {
        "X": 541,
        "Y": 477
    },
    {
        "X": 543,
        "Y": 477
    },
    {
        "X": 545,
        "Y": 477
    },
    {
        "X": 547,
        "Y": 477
    },
    {
        "X": 549,
        "Y": 477
    },
    {
        "X": 551,
        "Y": 477
    },
    {
        "X": 553,
        "Y": 477
    },
    {
        "X": 555,
        "Y": 477
    },
    {
        "X": 558,
        "Y": 477
    },
    {
        "X": 560,
        "Y": 477
    },
    {
        "X": 562,
        "Y": 477
    },
    {
        "X": 564,
        "Y": 477
    },
    {
        "X": 566,
        "Y": 477
    },
    {
        "X": 568,
        "Y": 477
    },
    {
        "X": 570,
        "Y": 477
    },
    {
        "X": 572,
        "Y": 477
    },
    {
        "X": 574,
        "Y": 477
    },
    {
        "X": 576,
        "Y": 477
    },
    {
        "X": 579,
        "Y": 477
    },
    {
        "X": 581,
        "Y": 477
    },
    {
        "X": 583,
        "Y": 477
    },
    {
        "X": 585,
        "Y": 477
    },
    {
        "X": 587,
        "Y": 477
    },
    {
        "X": 589,
        "Y": 477
    },
    {
        "X": 592,
        "Y": 477
    },
    {
        "X": 594,
        "Y": 477
    },
    {
        "X": 596,
        "Y": 477
    },
    {
        "X": 598,
        "Y": 477
    },
    {
        "X": 600,
        "Y": 477
    },
    {
        "X": 602,
        "Y": 477
    },
    {
        "X": 604,
        "Y": 477
    },
    {
        "X": 607,
        "Y": 477
    },
    {
        "X": 609,
        "Y": 477
    },
    {
        "X": 611,
        "Y": 477
    },
    {
        "X": 614,
        "Y": 477
    },
    {
        "X": 616,
        "Y": 477
    },
    {
        "X": 618,
        "Y": 477
    },
    {
        "X": 620,
        "Y": 477
    },
    {
        "X": 622,
        "Y": 477
    },
    {
        "X": 624,
        "Y": 477
    },
    {
        "X": 627,
        "Y": 477
    },
    {
        "X": 629,
        "Y": 477
    },
    {
        "X": 631,
        "Y": 477
    },
    {
        "X": 633,
        "Y": 477
    },
    {
        "X": 636,
        "Y": 477
    },
    {
        "X": 638,
        "Y": 477
    },
    {
        "X": 640,
        "Y": 477
    },
    {
        "X": 642,
        "Y": 477
    },
    {
        "X": 644,
        "Y": 477
    },
    {
        "X": 646,
        "Y": 477
    },
    {
        "X": 648,
        "Y": 477
    },
    {
        "X": 650,
        "Y": 477
    },
    {
        "X": 652,
        "Y": 477
    },
    {
        "X": 654,
        "Y": 477
    },
    {
        "X": 656,
        "Y": 477
    },
    {
        "X": 659,
        "Y": 477
    },
    {
        "X": 661,
        "Y": 477
    },
    {
        "X": 664,
        "Y": 477
    },
    {
        "X": 666,
        "Y": 477
    },
    {
        "X": 669,
        "Y": 477
    },
    {
        "X": 671,
        "Y": 477
    },
    {
        "X": 674,
        "Y": 477
    },
    {
        "X": 676,
        "Y": 476
    },
    {
        "X": 678,
        "Y": 476
    },
    {
        "X": 681,
        "Y": 475
    },
    {
        "X": 683,
        "Y": 475
    },
    {
        "X": 686,
        "Y": 475
    },
    {
        "X": 688,
        "Y": 474
    },
    {
        "X": 690,
        "Y": 474
    },
    {
        "X": 692,
        "Y": 473
    },
    {
        "X": 694,
        "Y": 473
    },
    {
        "X": 696,
        "Y": 473
    },
    {
        "X": 698,
        "Y": 473
    },
    {
        "X": 700,
        "Y": 473
    },
    {
        "X": 702,
        "Y": 473
    },
    {
        "X": 704,
        "Y": 473
    },
    {
        "X": 706,
        "Y": 472
    },
    {
        "X": 708,
        "Y": 472
    },
    {
        "X": 710,
        "Y": 472
    },
    {
        "X": 712,
        "Y": 472
    },
    {
        "X": 714,
        "Y": 472
    },
    {
        "X": 716,
        "Y": 472
    },
    {
        "X": 718,
        "Y": 472
    },
    {
        "X": 720,
        "Y": 472
    },
    {
        "X": 722,
        "Y": 472
    },
    {
        "X": 724,
        "Y": 472
    },
    {
        "X": 726,
        "Y": 472
    },
    {
        "X": 728,
        "Y": 472
    },
    {
        "X": 730,
        "Y": 471
    },
    {
        "X": 732,
        "Y": 471
    },
    {
        "X": 734,
        "Y": 471
    },
    {
        "X": 736,
        "Y": 471
    },
    {
        "X": 738,
        "Y": 471
    },
    {
        "X": 740,
        "Y": 471
    },
    {
        "X": 742,
        "Y": 471
    },
    {
        "X": 744,
        "Y": 471
    },
    {
        "X": 746,
        "Y": 471
    },
    {
        "X": 748,
        "Y": 471
    },
    {
        "X": 750,
        "Y": 471
    },
    {
        "X": 752,
        "Y": 471
    },
    {
        "X": 754,
        "Y": 471
    },
    {
        "X": 756,
        "Y": 471
    }
]
//
// NDollarRecognizer class
//
function NDollarRecognizer(useBoundedRotationInvariance) // constructor
{
	//
	// one predefined multistroke for each multistroke type
	//
	// console.log(waves2);
	var newArr = []
	// 缩减
	// for (const key in waves2) {
	// 	if(key % 3 === 0 ){
	// 		newArr.push(waves2[key])
	// 	}
	// }

	// 包装
	// waves1.forEach(element => {
	// 	newArr.push(new Point(element.X,element.Y))
	// });
	console.log(newArr);

	this.Multistrokes = new Array(NumMultistrokes);

	this.Multistrokes[0] = new Multistroke("line/person", useBoundedRotationInvariance, new Array(
		new Array(new Point(12,347),new Point(62,347))
	));
	this.Multistrokes[1] = new Multistroke("line/person", useBoundedRotationInvariance, new Array(
		new Array(new Point(12,347),new Point(62,351))
	));
	this.Multistrokes[2] = new Multistroke("circle/time", useBoundedRotationInvariance, new Array(
		circle
	));
	this.Multistrokes[3] = new Multistroke("wave/content", useBoundedRotationInvariance, new Array(
		waves1
	));
	this.Multistrokes[4] = new Multistroke("brkoen/place", useBoundedRotationInvariance, new Array(
		new Array(new Point(58,608),new Point(58,635),new Point(228,635))
	));
	this.Multistrokes[5] = new Multistroke("left/start", useBoundedRotationInvariance, new Array(
		new Array(new Point(620,314),new Point(636,314)),
		new Array(new Point(620,314),new Point(620,342),new Point(638,342)),

	));
	this.Multistrokes[6] = new Multistroke("right/end", useBoundedRotationInvariance, new Array(
		new Array(new Point(591,528),new Point(616,528),new Point(616,557),new Point(591,557)),

	));
	//
	// The $N Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
	//
	this.Recognize = function(strokes, useBoundedRotationInvariance, requireSameNoOfStrokes, useProtractor)
	{
		var t0 = Date.now();
		var points = CombineStrokes(strokes); // make one connected unistroke from the given strokes
		var candidate = new Unistroke("", useBoundedRotationInvariance, points);

		var u = -1;
		var b = +Infinity;
		for (var i = 0; i < this.Multistrokes.length; i++) // for each multistroke template
		{
			if (!requireSameNoOfStrokes || strokes.length == this.Multistrokes[i].NumStrokes) // optional -- only attempt match when same # of component strokes
			{
				for (var j = 0; j < this.Multistrokes[i].Unistrokes.length; j++) // for each unistroke within this multistroke
				{
					if (AngleBetweenUnitVectors(candidate.StartUnitVector, this.Multistrokes[i].Unistrokes[j].StartUnitVector) <= AngleSimilarityThreshold) // strokes start in the same direction
					{
						var d;
						if (useProtractor)
							d = OptimalCosineDistance(this.Multistrokes[i].Unistrokes[j].Vector, candidate.Vector); // Protractor
						else
							d = DistanceAtBestAngle(candidate.Points, this.Multistrokes[i].Unistrokes[j], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $N)
						if (d < b) {
							b = d; // best (least) distance
							u = i; // multistroke owner of unistroke
						}
					}
				}
			}
		}
		var t1 = Date.now();
		return (u == -1) ? new Result("No match.", 0.0, t1-t0) : new Result(this.Multistrokes[u].Name, useProtractor ? (1.0 - b) : (1.0 - b / HalfDiagonal), t1-t0);
	}
	this.AddGesture = function(name, useBoundedRotationInvariance, strokes)
	{
		this.Multistrokes[this.Multistrokes.length] = new Multistroke(name, useBoundedRotationInvariance, strokes);
		var num = 0;
		for (var i = 0; i < this.Multistrokes.length; i++) {
			if (this.Multistrokes[i].Name == name)
				num++;
		}
		return num;
	}
	this.DeleteUserGestures = function()
	{
		this.Multistrokes.length = NumMultistrokes; // clear any beyond the original set
		return NumMultistrokes;
	}
}
//
// Private helper functions from here on down
//
function HeapPermute(n, order, /*out*/ orders)
{
	if (n == 1) {
		orders[orders.length] = order.slice(); // append copy
	} else {
		for (var i = 0; i < n; i++)
		{
			HeapPermute(n - 1, order, orders);
			if (n % 2 == 1) { // swap 0, n-1
				var tmp = order[0];
				order[0] = order[n - 1];
				order[n - 1] = tmp;
			} else { // swap i, n-1
				var tmp = order[i];
				order[i] = order[n - 1];
				order[n - 1] = tmp;
			}
		}
	}
}
function MakeUnistrokes(strokes, orders)
{
	var unistrokes = new Array(); // array of point arrays
	for (var r = 0; r < orders.length; r++)
	{
		for (var b = 0; b < Math.pow(2, orders[r].length); b++) // use b's bits for directions
		{
			var unistroke = new Array(); // array of points
			for (var i = 0; i < orders[r].length; i++)
			{
				var pts;
				if (((b >> i) & 1) == 1)  // is b's bit at index i on?
					pts = strokes[orders[r][i]].slice().reverse(); // copy and reverse
				else
					pts = strokes[orders[r][i]].slice(); // copy
				for (var p = 0; p < pts.length; p++)
					unistroke[unistroke.length] = pts[p]; // append points
			}
			unistrokes[unistrokes.length] = unistroke; // add one unistroke to set
		}
	}
	return unistrokes;
}
function CombineStrokes(strokes)
{
	var points = new Array();
	for (var s = 0; s < strokes.length; s++) {
		for (var p = 0; p < strokes[s].length; p++)
			points[points.length] = new Point(strokes[s][p].X, strokes[s][p].Y);
	}
	return points;
}
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		var d = Distance(points[i-1], points[i]);
		if ((D + d) >= I)
		{
			var qx = points[i-1].X + ((I - D) / d) * (points[i].X - points[i-1].X);
			var qy = points[i-1].Y + ((I - D) / d) * (points[i].Y - points[i-1].Y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}
	if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
	return newpoints;
}
function IndicativeAngle(points)
{
	var c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
		var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function ScaleDimTo(points, size, ratio1D) // scales bbox uniformly for 1D, non-uniformly for 2D
{
	var B = BoundingBox(points);
	var uniformly = Math.min(B.Width / B.Height, B.Height / B.Width) <= ratio1D; // 1D or 2D gesture test
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = uniformly ? points[i].X * (size / Math.max(B.Width, B.Height)) : points[i].X * (size / B.Width);
		var qy = uniformly ? points[i].Y * (size / Math.max(B.Width, B.Height)) : points[i].Y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function Vectorize(points, useBoundedRotationInvariance) // for Protractor
{
	var cos = 1.0;
	var sin = 0.0;
	if (useBoundedRotationInvariance) {
		var iAngle = Math.atan2(points[0].Y, points[0].X);
		var baseOrientation = (Math.PI / 4.0) * Math.floor((iAngle + Math.PI / 8.0) / (Math.PI / 4.0));
		cos = Math.cos(baseOrientation - iAngle);
		sin = Math.sin(baseOrientation - iAngle);
	}
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++) {
		var newX = points[i].X * cos - points[i].Y * sin;
		var newY = points[i].Y * cos + points[i].X * sin;
		vector[vector.length] = newX;
		vector[vector.length] = newY;
		sum += newX * newX + newY * newY;
	}
	var magnitude = Math.sqrt(sum);
	for (var i = 0; i < vector.length; i++)
		vector[i] /= magnitude;
	return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i+1] * v2[i+1];
		b += v1[i] * v2[i+1] - v1[i+1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}
function BoundingBox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2) // average distance between corresponding points in two paths
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points) // length traversed by a point path
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
		d += Distance(points[i-1], points[i]);
	return d;
}
function Distance(p1, p2) // distance between two points
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
function CalcStartUnitVector(points, index) // start angle from points[0] to points[index] normalized as a unit vector
{
	var v = new Point(points[index].X - points[0].X, points[index].Y - points[0].Y);
	var len = Math.sqrt(v.X * v.X + v.Y * v.Y);
	return new Point(v.X / len, v.Y / len);
}
function AngleBetweenUnitVectors(v1, v2) // gives acute angle between unit vectors from (0,0) to v1, and (0,0) to v2
{
	var n = (v1.X * v2.X + v1.Y * v2.Y);
	var c = Math.max(-1.0, Math.min(1.0, n)); // ensure [-1,+1]
	return Math.acos(c); // arc cosine of the vector dot product
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }