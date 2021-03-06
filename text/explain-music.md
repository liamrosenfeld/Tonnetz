# Neo-Riemannian Theory Explained

This interactive visualization explores an application of Neo-Riemannian theory. I know that sounds like the final boss in a video game about math... but stick with me as this is actually quite fun to explore!

## Music Theory Basics

Before we can get into the Neo-Riemannian Theory there are some concepts that you should understand (such as triads and intervals). If you are already comfortable with basic music theory, feel free to skip this section.

### Intervals

An interval is simply the tonal gap between two notes. The smallest possible interval in Western music is a half step, which if you were to press two keys immediately next to each other on a piano. A whole step is simply two half steps. Intervals are a pretty simple concept and a huge building block for scales and chords.

Names have been assigned to each interval, but for this, you only need to know a couple:

- Minor Third (3 Half Steps)
- Major Third (4 Half Steps)
- Fifth (7 Half Steps)
- Octave (12 Half Steps - This is the same note name as the root)

### Triads

Triads are simply a type of chord that contains three notes. The lowest note is called the root, the middle note is the third, and the highest note is the fifth.

There are four different types of triads, but only two are relevant to this visualization: major and minor. Major triads contain a major third while minor triads contain a minor third.

You now have enough preliminary knowledge to dig into Neo-Riemannian Theory!

## History

Hugo Riemannian is widely regarded as the father of modern functional harmony and a lot of his work involves an idea called dualism. Dualism is the idea that major and minor triads are just mirrors of each other (a concept that will show through in the Tonnetz).

Riemannian then combined the idea of dualism with various other transpositions to create a series of transformations that can convert one chord to another.

Neo-Riemannian Theory takes the idea of transformations and just absolutely runs with it. Boiling down all transformations into a combination of three primary transformations.

## The Tonnetz

The Tonnetz (German for "tone-network") is a method of visualizing Neo-Riemannian transformations.

It is a lattice diagram representing tonal space. That is a fancy way of describing the reality of it being a series of triangles where each vertex is a note and each triangle is a major (pointing down) or minor (pointing up) triad consisting of the notes in its vertices.

The method in which the notes of the Tonnetz are laid out allows for its seemingly magical musical potential. Left to right horizontally, it increases by fifths. Descending vertically, it increases by major thirds.

That order allows for the Tonnetz to tie into Neo-Riemannian Theory as each primary Neo-Riemannian transformations can be represented by reflecting the triangle over one of its sides.

The three-dimensional visualization of the Tonnetz is a torus, so it will loop both horizontally and vertically. However, it loops vertically much quicker than horizontally so that is the only direction it will loop in the visualization.

For these triads to comply with existing music theory rules, the Tonnetz assumes enharmonic equivalence (in other words, Ab = G#) along with no distinctions between octaves.

## The Three Primary Transformations

### Parallel

The parallel transformation maintains the root and the fifth and moves the third a half step. It changes the chord between major and minor.

Ex: F major 🔄 F minor

![parallel transformation sheet music](/images/parallel.png)

### Relative

The relative transformation exchanges a triad for its relative major or minor.

In a major triad, it takes the fifth up a whole step up to become the root of a minor triad.

In a minor triad, it takes the root down a whole step to become the firth of a major triad.

Ex: F major 🔄 D minor

![relative transformation sheet music](/images/relative.png)

### Leading Tone

The leading tone transformation exchanges a triad for its Leading-Tone Exchange. This is the opposite of a relative major and minor.

In a major triad, it takes the root down a half step to become the fifth of a minor triad.

In a minor triad, it takes the fifth up by a half step to become the root of a minor triad.

Ex: F major 🔄 A minor

![leading tone transformation sheet music](/images/leading-tone.png)

### Smooth Voice Leading

You may have noticed how every primary transformation only changes one note. That allows for the effect of smooth voice leading as the other two notes can remain the same. Smooth voice leading allows for triads to be out of their regular order in the interest of making each chord change sound smooth. This interactive visualization implements smooth voice leading to achieve its fluid sound.

## Complex Operations

Every relationship between two major or minor triads can be mapped as some combination of the three primary operations, but here are the complex operations that are demonstrated on this website.

### Nebenverwandt

Both the left and right Nebenverwandt exchanges a major triad for its minor subdominant, and a minor triad for its major dominant. It either consists of RLP or PLR depending on if you want it to go leftwards or rightwards on the Tonnetz.

Ex: C major 🔄 F minor

### Slide

The Slide relation exchanges two triads that share a third. It consists of LPR.

Ex: C major 🔄 C♯ minor

### Hexatonic Pole

The Hexatonic Pole relation exchanges a triad for its hexatonic pole. It consists of LPL.

Ex: C major 🔄 A♭ minor

## Further Reading

- [Introduction to Neo-Riemannian Theory: A Survey and a Historical Perspective by Richard Cohn](https://www.jstor.org/stable/843871?seq=1#page_scan_tab_contents)
- [Essential Neo-Riemannian Theory for Today's Musician by Laura Felicity Mason](https://trace.tennessee.edu/cgi/viewcontent.cgi?referer=https://www.google.com/&httpsredir=1&article=2692&context=utk_gradthes)
- [Transformational Theory in the Undergraduate Curriculum - A Case for Teaching the Neo-Riemannian Approach by Nora Engebretsen](https://jmtp.appstate.edu/transformational-theory-undergraduate-curriculum-case-teaching-neo-riemannian-approach)
