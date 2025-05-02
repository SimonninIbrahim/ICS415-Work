
**How to Build and Run the Minecraft Clone (MSYS2 + OpenGL)**

**Requirements (already included if using MSYS2 with pacman):**
- g++
- cmake
- GLFW
- GLAD
- OpenGL
- glm

### ✅ Step 1: Open MSYS2 Terminal

Launch the **MSYS2 MinGW 64-bit** terminal (**not** the default MSYS2 shell).  
It's usually named:  
```
MSYS2 MinGW 64-bit
```

---

### ✅ Step 2: Navigate to the Project Folder

Use the `cd` command to move into the project folder:

```bash
cd /path/to/your/project
```

(Replace `/path/to/your/project` with the actual folder path.)

---

### ✅ Step 3: Build the Project

Run the following command to build the project using `g++`:

```bash
g++ main.cpp -o MinecraftClone -lglfw -ldl -lGL -Iinclude -Llib glad.c
```

> Make sure `glad.c` is in the folder, and the `include/` and `lib/` directories contain GLAD, GLFW, and other required headers/libs.

---

### ✅ Step 4: Run the Program

Once compiled, simply run:

```bash
./MinecraftClone
```

---

### Notes

- Use **mouse** to look around.
- Use **W, A, S, D** keys to move.
- Left-click to **destroy blocks**, right-click to **add blocks**.
- Press `ESC` to exit.

