# The Mushroom Juggler

Based on the sandbag minigame from the Super Smash Bros series: https://www.youtube.com/watch?v=soriF9HdJsY.

The mushroom juggle game has three main phases: 1) Juggle the mushroom; 2) Watch the mushroom go higher; 3) Get scored accordingly.

## How to play

Left click to launch the mushroom, WASD to move. That's it. A toggle button and reset button are down on the bottom right.



## Technologies, Libraries, and APIs:

•	Canvas API for rendering the game board and assets
•	Webpack for bundling the source Javascript code
•	npm to manage project dependencies



## Code excerpt

The Mushroom Juggler runs completely in Vanilla Javascript/HTML and is completely DOM based.

```
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) =>{

        if(entry.isIntersecting) entry.target.classList.add('show');
        
        else entry.target.classList.remove('show')

    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const toggleMusic = document.getElementById("mute-button"), restartButton = document.getElementById("restart-button"), canvas = document.getElementById("sandbag-game");
const backgroundMusic = document.createElement("audio");
backgroundMusic.src = "./assets/sound/galdin_quay.mp3";
backgroundMusic.volume = 0.5;
let musicStarted = false;
//backgroundMusic.play();



let game = new Game(canvas);
game.play();

window.addEventListener('keydown', (event) => game.convertKeydown(event.key))
window.addEventListener('keyup', (event) => game.convertKeyRelease(event.key))

window.addEventListener('click', () => game.convertLeftClick());

toggleMusic.addEventListener("click", ()=>{
    if(!musicStarted){
        backgroundMusic.play();
        musicStarted = true;
    }else if (musicStarted && backgroundMusic.volume !== 0){
        backgroundMusic.volume = 0;
    }else {
        backgroundMusic.volume = 0.5;
    } 
})

restartButton.addEventListener("click", ()=>{
    game.reset();
})
```

## Future Features

More effects and characters. 



## Credits and fair use:

•	Yoko Shimamura and Square Enix for the song "Galdin Quay Theme ガーディナ (2016)" https://www.youtube.com/watch?v=DgiegmrMxm4
•	Nexon for ownership of Maplestory sprites (2022)(all characters and animations used in this project).

This project is for educational purposes only.


Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” for purposes such as criticism, comment, news reporting, teaching, scholarship, education and research.

Fair use is a use permitted by copyright statute that might otherwise be infringing. 

Non-profit, educational or personal use tips the balance in favor of fair use. 

FAIR USE DEFINITION:

(Source: http://en.wikipedia.org/wiki/Fair_use)

Fair use is a doctrine in the United States copyright law that allows limited use of copyrighted material without requiring permission from the rights holders, such as for commentary, criticism, news reporting, research, teaching or scholarship.  It provides for the legal, non-licensed citation or incorporation of copyrighted material in another author’s work under a four-factor balancing test.  The term “fair use” originated in the United States.  A similar principle, fair dealing, exists in some other common law jurisdictions.  Civil law jurisdictions have other limitations and exceptions to copyright. 

U.S. COPYRIGHT OFFICE- FAIR USE DEFINITION

(Source: http://www.copyright.gov/fls/fl102.html)

One of the rights accorded to the owner of copyright is the right to reproduce or to authorize others to reproduce the work in copies or phonorecords.  This right is subject to certain limitations found in sections 107 through 118 of the copyright law (title 17, U.S. Code).  One of the more important limitations is the doctrine of “fair use”.  The doctrine of fair use has developed through a substantial number of court decisions over the years and has been codified in section 107 of the copyright law. 

Section 107 contains a list of the various purposes for which the reproduction of a particular work may be considered fair, such as criticism, comment, news reporting, teaching, scholarship, and research.  Section 107 also sets out in four factors to be considered in determining whether or not a particular use is fair: 

1. The purpose and character of the use, including whether such use is of commercial nature or is for nonprofit educational purposes

2. The nature of the copyrighted work

3. The amount and substantiality of the portion used in relation to the copyrighted work as a whole

4. The effect of the use upon the potential market for, or value of, the copyrighted work

The distinction between fair use and infringement may be unclear and not easily defined. There is no specific number of words, lines, or notes that may safely be taken without permission. Acknowledging the source of the copyrighted material does not substitute for obtaining permission.

The 1961 Report of the Register of Copyrights on the General Revision of the U.S. Copyright Law cites examples of activities that courts have regarded as fair use: “quotation of excerpts in a review or criticism for purposes of illustration or comment; quotation of short passages in a scholarly or technical work, for illustration or clarification of the author’s observations; use in a parody of some of the content of the work parodied; summary of an address or article, with brief quotations, in a news report; reproduction by a library of a portion of a work to replace part of a damaged copy; reproduction by a teacher or student of a small part of a work to illustrate a lesson; reproduction of a work in legislative or judicial proceedings or reports; incidental and fortuitous reproduction, in a newsreel or broadcast, of a work located in the scene of an event being reported.”

Copyright protects the particular way an author has expressed himself. It does not extend to any ideas, systems, or factual information conveyed in the work.

The safest course is always to get permission from the copyright owner before using copyrighted material. The Copyright Office cannot give this permission.

When it is impracticable to obtain permission, use of copyrighted material should be avoided unless the doctrine of fair use would clearly apply to the situation. The Copyright Office can neither determine if a certain use may be considered fair nor advise on possible copyright violations. If there is any doubt, it is advisable to consult an attorney.

FL-102, Revised September 2010
