<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SquareController extends Controller
{
    public function redSquare()
    {
        return Inertia::render('RedSquare', [
            'color' => 'skyblue',
            
        ]);
    }

    public function redSquareBlade()
    {
        return view('RedSquare', [
            'color'=> 'skyblue',
            'size'=> '78'
        ]);
    }
}
