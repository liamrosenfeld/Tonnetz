# The Code Explained

Poking around the source code is always fun (I would recommend starting in the sketch folder), but if you want a dive into what makes this program tick... just keep reading!

## Choosing the…

### Platform

Constraints encourage new pursuits and this competition was certainly a case of that. The primary constraint wa that it had to run on REPL.it which forced me to leave the my comfort zone of developing for Apple platforms in Swift and build a web app in order to have a GUI.

### Language

The dynamic nature of JavaScript, while making it more fluid to type, has the drawbacks of being significantly less safe and self-documenting than statically typed languages (such as Swift) so I opted to use Typescript in lieu. While it added additional hurdles during setup, I believe that the benefits I felt throughout the month of development were worth it.

### Frameworks

Going in I knew that the lattice would require a large amount of custom geometric drawing, so I opted to build the graphical user interface using p5. I chose p5 because I had prototyped my Fourier Transform visualizer in processing before writing it in Swift, so I was competent enough with the API.

I wanted the MIDI playback to sound as natural as possible so I decide build the playback engine on top of ToneJS with the *Salamander Grand Piano V2* sample. I chose ToneJS because it is the only major framework that supports that type of playback. I chose the Salamander Grand Piano V2 sample because it is the most natural sounding creative commons sample I could find after extensive testing.

## Implementation

### Lattice

The lattice contains to major parts tht are handled largely separately: the triangles and the circles. They are both drawn using p5. To allow for the lattice to resize as the window resizes, everything is generated dynamically, live at runtime.

The triangles drew from all my knowledge that remains from 8th grade Geometry. The lattice drawer uses properties of equilateral triangles to draw the entire lattice when only given a starting point and the size of the triangle's side. Each triangle object first calculates all three vertices from the starting point and the side length, draws it using p5, and then passes certain points to the triangle right of and below it so they know where to draw. This part of the project I used as an "hello world" equivalent to familiarize myself with the p5 API.

As the triangles are drawn, each point is saved exactly once going left-right/top-bottom. An array of MIDI values is then generated from a given starting note ([major thirds descending vertically, fifths](/explain-music#the-tonnetz)). Then for each point the respective MIDI values is selected, converted into the note representation, and drawn inside of a circle at that point. That same MIDI array is later used to reset the voice leading.

### Movement

To ensure consistency, all updates first had to pass through a position manager which translates and passes them to the lattice and the player. Those two aspects of the program are independent to a greater extent than one would expect in order to achieve smooth voice leading, where the notes being played are just as determined by where the triangle was as where it is.

Lattice position movement is the more intuitive of the two. If the user selects the equivalent of left (leading tone or relative depending if major or minor), it subtracts one from the selected x value. The same is true for the the equivalent of right (x + 1) and parallel ( y ± 1 depending on major or minor).

To maintain smooth voice leading, only one note changes for any primary transformation. Just retrieving notes from a matrix would not be effective for that as it would not know which notes should be left unchanged. To deal with this particular case, the pitches of all the notes in the current triad are stored internally. Whenever the position manager orders a move it applies the relevant transformation (explained in the [music explanations section](/explain-music)).

When the 'progression is recentered', the smooth leading tone is reset so all the notes are in their original order. It finds the root using matrix math on the MIDI array and then calculates the rest if the chord by adding ste intervals.

Compound transformations are achieved by triggering the respective primary operations back to back and then refreshing the UI at the end. That allows a smooth experience that is consistent with any possible combination of primary transformations.

**If you would like to view the behind the scenes of movements, just check the javascript console.** It prints information about what is going on for your viewing pleasure.

### Playback

The majority of the playback logistics are already taken care of from movement, so the only thing left is to actually play the sound assigned to the note. This is where ToneJS comes in, as its what the sampler is written using. The sampler takes recordings of notes from all across the piano, pitch shifts it to fill every note, and then plays the recording with an effect pipeline depending on the midi input.

### Recording

It's easy for extra features such as recording to become tacked on at the end, however that was not the case when designing the architecture for the underpinnings of this project. The movement system was written with extensibility in mind, so recordings are able to be represented as an array of a union between pauses and moves. To playback, the array can just be popped with it passing moves to the position manager and waiting to pop the next action on waits.
