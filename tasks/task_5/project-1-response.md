# TASK 5: Project Reviews

**Student:** Diana Edvi (40198139)

## Projects Reviewed

* [**PROJECT 1: Aquarium**](https://philippe-bn.github.io/cart263/projects/project-1/) by Philippe
* [**Snake Game**](https://yaxuanpang.github.io/cart263/topics/project1/) by Yaxuan
* [**Dear Journal**](https://ajoycel.github.io/cart263/project1/) by ajoycel

---

### 1. Aquarium Project (Philippe)

The first project that I looked at was the aquarium project by Philippe. I liked it because I thought it was very satisfying how all the fish swam together towards the mouse. I liked the colors too.

* Building your own vector class is a great way to understand how vector operations work, so I enjoyed seeing that in the code.
* My personal biggest gripe is with the amount of commented-out code. It obviously doesn’t affect the output, but it makes it a bit harder to read. Sometimes I started reading a comment thinking it was an explanation for the following lines, but it was just code, so I had to interpret the lines myself.
* I would have loved to see the full Boids code implemented since it seems the groundwork was there. However, the `seek` and `separation` logic being there already creates a coherent little school of fish, so good job to Philippe.

---

### 2. Snake Game (Yaxuan)

The second project I looked at was the Snake game by Yaxuan. I got to score 41 on my best attempt! It’s a classic project, so I was very familiar with how it works.

* The addition of the heart system was a good way to balance the randomness of the circles spawning. I would recommend that the circles animate in slowly before becoming active in the scene so that the player has time to register and dodge them. Otherwise, there can occur some unlucky cases where a circle spawns right in front of the player.
* I noticed a potential optimization in the `snake.move()` method. Currently, every segment of the snake is moved sequentially, one after another. Since the snake is just an array of cells and all cells look the same, this can be optimized by simply taking the tail cell and moving it to the cell in front of the head. This project is on such a small scale that this change would show basically no difference in performance. As it is right now, the current implementation works great.

---

### 3. Dear Journal (ajoycel)

Finally, I looked at the Dear Journal project by ajoycel. I took that opportunity to write a little bit for my mental health, which was a good break from the arduous studying I have been doing.

* I noticed that the save and retrieve buttons do not seem to work, which is a little unfortunate. I really loved the different backgrounds we could choose from, my favorite being the ocean one.
* In the code, I enjoyed seeing that the previous animations are cancelled when switching themes. I enjoy seeing little performance savers like that.
