# 📚 Sample Questions with Answers - Working in Conceptify AI

These are the questions that currently work in the demo app. Try them!

---

## Nursery/KG (Age 3-5)

### Question: "What is a circle?"
**Answer:** A circle is a round shape with no corners. Examples: ball, wheel, pizza, sun.

**Try in app:** Type "what is a circle" and select "Nursery/KG (Age 3-5)"

---

### Question: "Why do we need water?"
**Answer:** We need water to drink, stay healthy, and help our body work. Plants and animals also need water to live.

**Try in app:** Type "why do we need water" and select "Nursery/KG (Age 3-5)"

---

## Class 3-5 (Elementary)

### Question: "What is multiplication?"
**Answer:** Multiplication is repeated addition. Instead of adding 3+3+3+3, we write 3×4=12. It's a faster way to add the same number many times.

**Try in app:** Type "what is multiplication" and select "Class 3-5 (Elementary)"

---

### Question: "Explain the water cycle"
**Answer:** The water cycle shows how water moves: 
1. Sun heats water → evaporation (water becomes vapor)
2. Vapor rises → forms clouds (condensation)
3. Clouds get heavy → rain falls (precipitation)
4. Rain flows to rivers/oceans → cycle repeats

**Try in app:** Type "explain the water cycle" and select "Class 3-5 (Elementary)"

---

## Class 6-8 (Middle School)

### Question: "What is photosynthesis?"
**Answer:** Photosynthesis is how plants make food:
- **Inputs:** Sunlight + Water + CO₂
- **Process:** Happens in chloroplasts (green parts)
- **Outputs:** Glucose (food) + Oxygen
- **Formula:** 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

**Try in app:** Type "what is photosynthesis" and select "Class 6-8 (Middle School)"

---

### Question: "Explain gravity"
**Answer:** Gravity is a force that pulls objects toward each other. Earth's gravity pulls everything toward its center (that's why things fall down). The bigger the object, the stronger its gravity.

**Try in app:** Type "explain gravity" and select "Class 6-8 (Middle School)"

---

## Class 9-10 (High School)

### Question: "Explain Newton's third law"
**Answer:** For every action, there's an equal and opposite reaction. When you push a wall (action), the wall pushes you back (reaction) with equal force.

**Try in app:** Type "explain newton's third law" and select "Class 9-10 (High School)"

---

### Question: "What is quadratic equation?"
**Answer:** A quadratic equation has the form ax²+bx+c=0 where a≠0.
- **Solution:** x = (-b ± √(b²-4ac))/2a
- **Graph:** Forms a parabola (U-shape)
- **Example:** x²-5x+6=0 → (x-2)(x-3)=0 → x=2 or x=3

**Try in app:** Type "what is quadratic equation" and select "Class 9-10 (High School)"

---

## Engineering (BTech/BE)

### Question: "Explain recursion in programming"
**Answer:** Recursion is when a function calls itself:
```python
def factorial(n):
    if n == 0:  # Base case
        return 1
    return n * factorial(n-1)  # Recursive call
```
- **Base case:** Stops recursion
- **Recursive case:** Breaks problem into smaller version
- **Example:** factorial(5) = 5 × 4 × 3 × 2 × 1 = 120

**Try in app:** Type "explain recursion" and select "Engineering (BTech/BE)"

---

### Question: "What is stack overflow?"
**Answer:** Stack overflow occurs when call stack memory is exhausted:
- **Cause:** Too many function calls (usually infinite recursion)
- **Stack:** Memory area storing function calls (LIFO)
- **Prevention:** Proper base cases, tail recursion, iteration

**Try in app:** Type "what is stack overflow" and select "Engineering (BTech/BE)"

---

### Question: "What is Big O notation?"
**Answer:** Big O describes algorithm time/space complexity:
- **O(1):** Constant - array access
- **O(log n):** Logarithmic - binary search
- **O(n):** Linear - loop through array
- **O(n log n):** Linearithmic - merge sort
- **O(n²):** Quadratic - nested loops

**Try in app:** Type "what is big o notation" and select "Engineering (BTech/BE)"

---

## Medical (MBBS/BDS)

### Question: "Explain the cardiac cycle"
**Answer:** The cardiac cycle is one complete heartbeat:
1. **Atrial Systole (0.1s):** Atria contract, push blood to ventricles
2. **Ventricular Systole (0.3s):** Ventricles contract, pump blood out
3. **Diastole (0.4s):** All chambers relax, refill with blood
- **Duration:** ~0.8 seconds (75 bpm)
- **Control:** SA node (pacemaker)

**Try in app:** Type "explain cardiac cycle" and select "Medical (MBBS/BDS)"

---

## JEE/NEET Preparation

### Question: "Solve integration by parts"
**Answer:** Formula: ∫u dv = uv - ∫v du

**Example:** ∫x·eˣ dx
- Let u = x, dv = eˣ dx
- Then du = dx, v = eˣ
- ∫x·eˣ dx = x·eˣ - ∫eˣ dx = x·eˣ - eˣ + C = eˣ(x-1) + C

**Try in app:** Type "solve integration by parts" and select "JEE/NEET Preparation"

---

## 🎯 How to Use

1. Open the Conceptify AI app at http://localhost:3000
2. Type any question from above
3. Select the appropriate education level
4. Click "Get Explanation"
5. See: Explanation + Real-life Analogy + 3 Practice Questions

---

## 📝 Quick Test List

Copy and paste these into the app:

**Elementary:**
- what is multiplication
- explain the water cycle

**Middle School:**
- what is photosynthesis
- explain gravity

**High School:**
- explain newton's third law
- what is quadratic equation

**Engineering:**
- explain recursion
- what is stack overflow
- what is big o notation

**Medical:**
- explain cardiac cycle

**Competitive:**
- solve integration by parts

---

## 🚀 With Real Amazon Nova

When you enable real AWS (set `isDemoMode = false`), the AI can answer ANY question at ANY level, not just these pre-programmed ones!
