# IDEA9103_Individual_work
Individual Project created for IDEA9103 final job

1. Instructions on how to interact with the work

How to interact with the work
1️. Load the webpage
Open the project using Live Server or in a browser (Google Chrome recommended).

2️. Play the audio
Click the "Play/Pause" button on the top-left corner to start or pause the background music.
In my code The audio file is "Aimer-Eclipse.wav". Users can replace the audio files themselves.

3️. Adjust the volume
On the right side of the screen, use the volume slider to control the playback volume of the music.

4️. Watch the animation
The Pixel Dot Art version of "Piet Mondrian Broadway Boogie Woogie" is displayed using dots.
A Snake moves automatically across the screen, with its speed and direction controlled by the audio spectrum and energy.
When the Snake touches a Dot, that Dot's color will change dynamically based on the interaction.

5️. Responsive design
The project is responsive: resizing the browser window will automatically adapt the artwork layout to fit the new window size.


2. Details

In this individual work, I carried out personalized expansion and animation design based on the Pixel Dot Art visualization completed by our group. I mainly introduced the mechanism of "audio controlling the movement of snake-like elements and interacting with images" to integrate the dynamic sound with the static lattice structure of images to achieve a more immersive and rhythmic visual experience.

Of the four available ways to personalize animations, I chose audio as the source of animation drivers. The implementation is as follows:

I used the FFT (Fast Fourier Transform) spectrum analyzer from the p5.sound library to extract the features in the audio.

The overall frequency energy, from 20Hz to 20,000 Hz, is obtained using fft.getEnergy() and used to control the snake's movement speed.

The spectrum array is obtained by fft.analyze(), and the low frequency bands in it are mapped to small angular perturbations that affect the forward direction of the snake, resulting in a dynamic but smooth dancing trajectory.

In this way, the whole work has an obvious visual effect of "dancing with the rhythm of the music". At the same time, combined with the static dot matrix composition of the original image, the emotional fluctuations and rhythm changes of the sound are displayed between the combination of movement and static.


Unlike the original team version, I have significantly expanded the team code in the following ways:

Implementation of sound driving mechanism: Through FFT spectrum analysis provided by p5.sound, I extract the energy and spectrum of audio, and use them to control the speed and direction change of the snake, so that the animation responds to the music rhythm.

Lattice color change logic: When the snake "collids" with some points in the lattice, these points are given new random colors, thus achieving a visual effect of "sound activated pixels".

Add UI interaction: I added play/pause buttons and volume sliders to give the user more control over their sound.

Add UI interaction: I added play/pause buttons and volume sliders to give the user more control over their sound.


In my personal code, I mainly designed the linkage animation of dots and snake elements in the image, including:

dots properties change: These dots, which are used to restore the pixel image, will change color in my animation when the snake touches them, changing to a random RGB color, creating a visual feedback like "activated".

snake's movement path: The snake, controlled by audio, shutters between the image lattice and becomes the only active movement element in the whole work, which emphasizes the contrast with the background lattice.

Sound and picture linkage: the stronger the energy of the sound, the faster the speed of the snake; The larger the frequency change, the more obvious the orientation change of the snake. This allows the final rendered animation to be highly synchronized with the music production.

The difference with other team members is:

Some team members used timers for dot matrix flickering animation.

Some team members use mouse interaction to drive dot matrix color reaction;

I, on the other hand, focused on the mapping of sound frequency to movement behavior, and was the only solution that combined the combination of "sound driven actor (snake) + dot matrix change".

This ensured that my work was clearly unique among the group members.


My personal animation creative inspiration mainly comes from the following two directions:

Inspiration 1: Music visualization works

Inspired by The Coding Train's "17.11: Sound Visualization: Frequency Analysis with FFT - p5.js Sound Tutorial"（https://www.youtube.com/watch?v=2O3nm0Nvbi4）, I learned how to use p5.FFT to perform real-time analysis of sound frequency and energy, and map it to dynamic visual effects. This video demonstrates the possibility of audio-driven graphic behavior. My project precisely draws on this approach, enabling the snake to move in accordance with the music rhythm and influence the image.

Inspiration 2: The logic of the snake in the game

Although I didn't fully reproduce the traditional game mechanics, I was inspired to design a snake on a graphic that was driven by sound and interacted with pixels on the graphic (color change). This combination strengthens the connection among "sound-image-behavior", and makes the animation have richer story and perceptual logic.

By combining these two kinds of inspiration, my animation works not only retain the visual style of dot matrix image restoration in group code, but also introduce a novel and interactive sound driving mechanism to realize the creation of my personal style.

My personal animation was based on the pixel image generation system of the group project, and introduced the dynamic element of sound control on it, and realized the following key technical logic:

Audio loading and analysis

I preloaded the.wav audio file using loadSound() in the preload() function and spectrally analyzed it via p5.FFT. Call getEnergy() to get the energy value of the currently playing audio, which is used to dynamically control the snake's movement speed.

fft = new p5.FFT(smoothing, numBins);

song.connect(fft);

let energy = fft.getEnergy(20, 20000);

Snake behavior control

I created a custom Snake class that adjusts the speed and direction of the snake each frame based on the audio energy using the update() function. The snake moves across the screen in the form of a red circle, simulating "sound-driven exploratory behavior".

this.speed = map(energy, 0, 255, 2, 10);

this.direction.rotate(angleOffset);

Visual interaction with the lattice

The snake position is continuously distance detected with every point in the Dot class. When the snake approaches a pixel point, the changeColor() method of the point is triggered to make its color change randomly, so as to realize the "light path" visualization effect and enhance the visual feedback.

if (d < this.size / 2 + dot.size / 2) {

 dot.changeColor();

}

Responsive design and user control

The whole system supports adaptive window resizing, and the image is automatically reconstructed with windowResized(). At the same time, volume slider volumeSlider is provided, users can control the audio playback volume in real time. With the play/pause button, the interactive experience is complete.

