export const mockResponses = {
  // Nursery/KG Level
  'circle': {
    explanation: `A circle is a round shape, like a ball or a wheel! It has no corners or edges. Every point on a circle is the same distance from the center. You can draw a circle by going around and around in the same path.`,
    analogy: `Think of a pizza! A pizza is a circle. When you cut it, all the pieces come from the middle point. A hula hoop, a clock, and the sun all look like circles too!`,
    questions: [
      'Can you find 5 circle-shaped things in your room?',
      'What happens when you roll a circle?',
      'Is a square a circle? Why or why not?'
    ]
  },
  'water': {
    explanation: `We need water to stay alive and healthy! Water helps our body work properly. We drink water when we are thirsty. Plants and animals also need water to live and grow.`,
    analogy: `Water is like fuel for a car. Just like a car needs fuel to run, our body needs water to work. Without water, we feel tired and sick, just like a car stops without fuel.`,
    questions: [
      'How many glasses of water should you drink every day?',
      'What happens to plants when they do not get water?',
      'Where does water come from?'
    ]
  },

  // Elementary Level
  'multiplication': {
    explanation: `Multiplication is a quick way to add the same number many times. Instead of adding 3+3+3+3, we can multiply 3×4=12. The first number tells us what to add, and the second number tells us how many times to add it.`,
    analogy: `Think of multiplication like packing lunch boxes. If you put 3 cookies in each box and you have 4 boxes, you have 3×4=12 cookies total. It is faster than counting each cookie one by one!`,
    questions: [
      'What is 5 × 6? Show it as repeated addition.',
      'If you have 7 bags with 8 candies each, how many candies do you have?',
      'What is the difference between 4×3 and 3×4?'
    ]
  },
  'water cycle': {
    explanation: `The water cycle is how water moves around Earth. Water from oceans and rivers evaporates (turns into vapor) and goes up into the sky. It forms clouds, then falls back as rain or snow. This water flows back to rivers and oceans, and the cycle continues.`,
    analogy: `Imagine water on a never-ending journey! It is like a roller coaster that goes up (evaporation), rides through the sky (clouds), comes down (rain), and goes back to the start (rivers and oceans) to ride again.`,
    questions: [
      'What are the four main stages of the water cycle?',
      'Why do we not run out of water on Earth?',
      'What happens to water when the sun heats it?'
    ]
  },

  // Middle School Level
  'photosynthesis': {
    explanation: `Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose (food) and oxygen. This happens in the chloroplasts of plant cells, specifically in the chlorophyll. The process has two stages: light-dependent reactions that capture energy from sunlight, and light-independent reactions (Calvin cycle) that use that energy to create glucose.`,
    analogy: `Think of plants as solar-powered factories. Just like solar panels convert sunlight into electricity to power your home, plants use sunlight as energy to create their own food. The leaves are like solar panels, and the green chlorophyll is the machinery that does the conversion work. Water and CO2 are the raw materials, and glucose is the finished product!`,
    questions: [
      'What are the main inputs and outputs of photosynthesis?',
      'Explain the role of chlorophyll in the light-dependent reactions.',
      'What is the difference between light-dependent and light-independent reactions (Calvin cycle)?'
    ]
  },
  'gravity': {
    explanation: `Gravity is a force that pulls objects toward each other. Earth's gravity pulls everything toward its center, which is why things fall down. The bigger an object is, the stronger its gravitational pull. Gravity keeps us on the ground, makes things fall, and keeps the Moon orbiting Earth.`,
    analogy: `Think of gravity like an invisible magnet inside Earth. Just like a magnet pulls metal objects toward it, Earth's gravity pulls everything toward its center. The heavier you are, the stronger the pull, which is why astronauts float in space where Earth's gravity is very weak.`,
    questions: [
      'Why do heavier objects and lighter objects fall at the same speed?',
      'What would happen if there was no gravity on Earth?',
      'How does gravity keep the Moon orbiting around Earth?'
    ]
  },

  // High School Level
  'newton': {
    explanation: `Newton's third law states that for every action, there is an equal and opposite reaction. This means when one object applies a force on another object, the second object applies an equal force back in the opposite direction. Both forces are equal in strength but opposite in direction, and they act on different objects.`,
    analogy: `When you jump off a boat onto the shore, you push the boat backward while you move forward. The harder you push against the boat, the faster you move forward, but the boat also moves backward with equal force. This is why small boats move away when you step off them - you are experiencing Newton's third law!`,
    questions: [
      'If you push a wall with 50N force, how much force does the wall push back on you?',
      'Explain how a rocket moves upward using Newton\'s third law.',
      'Give three examples of Newton\'s third law from your daily life.'
    ]
  },
  'quadratic': {
    explanation: `A quadratic equation is a polynomial equation of degree 2, written as ax²+bx+c=0, where a≠0. It forms a parabola when graphed. We can solve it using factoring, completing the square, or the quadratic formula: x = (-b ± √(b²-4ac))/2a. The discriminant (b²-4ac) tells us how many real solutions exist.`,
    analogy: `Think of throwing a ball in the air. The path it follows is a parabola, which is the graph of a quadratic equation. The highest point the ball reaches is the vertex, and where it lands are the roots (solutions) of the equation.`,
    questions: [
      'Solve x²-5x+6=0 using factoring method.',
      'What does the discriminant tell you about the solutions?',
      'How do you find the vertex of a parabola from a quadratic equation?'
    ]
  },

  // Engineering Level
  'recursion': {
    explanation: `Recursion is a programming technique where a function calls itself to solve a problem by breaking it into smaller, similar subproblems. Each recursive call works on a smaller version of the original problem until reaching a base case that stops the recursion. The solution builds up as the recursive calls return their results back up the call stack.`,
    analogy: `Think of Russian nesting dolls (Matryoshka). To find the smallest doll, you open one doll, find another inside, open that one, and continue until you reach the smallest doll that cannot be opened further (base case). Each step is the same process applied to a smaller version, just like recursion applies the same function to smaller inputs.`,
    questions: [
      'Write a recursive function to calculate factorial of n and explain the base case.',
      'What is the difference between recursion and iteration in terms of memory usage?',
      'How can you prevent stack overflow in recursive functions?'
    ]
  },
  'stack overflow': {
    explanation: `A stack overflow occurs when a program uses more memory space than the call stack has available. The call stack stores information about active functions. When functions call themselves recursively without a proper exit condition, or when there are too many nested function calls, the stack runs out of space and the program crashes with a stack overflow error.`,
    analogy: `Imagine stacking plates in your kitchen cabinet. You can only stack plates up to the ceiling. If you keep adding more plates without removing any, eventually the stack becomes too tall and topples over. Similarly, a stack overflow happens when your program tries to add more function calls than the memory can handle.`,
    questions: [
      'What is the difference between stack overflow and heap overflow?',
      'Write a recursive function that causes stack overflow and explain why.',
      'How can tail recursion optimization help prevent stack overflow?'
    ]
  },
  'big o': {
    explanation: `Big O notation describes the time or space complexity of an algorithm as input size grows. It shows worst-case performance. O(1) is constant time, O(n) is linear, O(n²) is quadratic, O(log n) is logarithmic. We ignore constants and lower-order terms, focusing on the dominant factor as n approaches infinity.`,
    analogy: `Think of Big O like estimating how long it takes to find a book. O(1) is knowing exactly where it is. O(n) is checking each book one by one. O(log n) is using binary search in a sorted library. O(n²) is comparing every book with every other book. The bigger your library (n), the more these differences matter.`,
    questions: [
      'What is the time complexity of binary search and why?',
      'Compare O(n log n) and O(n²) for sorting 1 million items.',
      'Why do we drop constants in Big O notation?'
    ]
  },

  // Medical Level
  'cardiac cycle': {
    explanation: `The cardiac cycle is the sequence of events in one heartbeat, consisting of systole (contraction) and diastole (relaxation). During atrial systole, atria contract pushing blood into ventricles. Then ventricular systole pumps blood to lungs and body. Diastole allows chambers to refill. The cycle takes about 0.8 seconds at rest, controlled by the SA node.`,
    analogy: `Think of your heart as a two-story house with water pumps. The upstairs rooms (atria) collect water and push it downstairs (ventricles). Then the downstairs pumps send water out to the neighborhood (body) and the water treatment plant (lungs). This happens 60-100 times per minute, non-stop!`,
    questions: [
      'What are the phases of the cardiac cycle and their duration?',
      'How do heart valves prevent backflow during the cardiac cycle?',
      'What is the role of the SA node in regulating the cardiac cycle?'
    ]
  },

  // Competitive Exam Level
  'integration': {
    explanation: `Integration by parts is a technique based on the product rule of differentiation. The formula is ∫u dv = uv - ∫v du. We choose u using LIATE (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) and dv as the remaining part. This method is useful for products of functions where standard integration does not work.`,
    analogy: `Think of integration by parts like disassembling a complex machine. You separate it into two parts (u and dv), work on each piece separately, then put them back together in a new way (uv - ∫v du) that is easier to handle. The LIATE rule tells you which part to disassemble first.`,
    questions: [
      'Solve ∫x·e^x dx using integration by parts.',
      'When should you use integration by parts vs substitution?',
      'Solve ∫ln(x) dx using integration by parts.'
    ]
  },

  // Additional topics
  'python': {
    explanation: `Python is a high-level, interpreted programming language known for its simple syntax and readability. It uses indentation to define code blocks instead of braces. Python is dynamically typed, meaning you don't need to declare variable types. It's widely used for web development, data science, AI, automation, and more.`,
    analogy: `Think of Python like writing instructions in plain English compared to other languages that are like writing in legal jargon. Just as plain English is easier to read and understand, Python's syntax is designed to be intuitive and close to natural language, making it perfect for beginners.`,
    questions: [
      'What is the difference between Python 2 and Python 3?',
      'Explain the concept of list comprehension in Python.',
      'What are Python decorators and when would you use them?'
    ]
  },
  'mitochondria': {
    explanation: `Mitochondria are the powerhouses of the cell. They generate ATP (adenosine triphosphate), which is the energy currency of cells. Through cellular respiration, mitochondria convert glucose and oxygen into ATP, carbon dioxide, and water. They have their own DNA and double membrane structure.`,
    analogy: `Think of mitochondria as tiny power plants inside each cell. Just like a power plant burns fuel to generate electricity for a city, mitochondria burn glucose to produce ATP energy that powers all cellular activities - from muscle contraction to brain function.`,
    questions: [
      'Why do mitochondria have their own DNA?',
      'Explain the process of cellular respiration in mitochondria.',
      'Which cells have the most mitochondria and why?'
    ]
  },
  'democracy': {
    explanation: `Democracy is a system of government where power is vested in the people, who exercise it directly or through elected representatives. Key principles include free and fair elections, rule of law, protection of human rights, and separation of powers. Citizens have the right to vote, express opinions, and participate in decision-making.`,
    analogy: `Think of democracy like a classroom where students vote on class activities. Everyone gets a say, the majority decision wins, but minority rights are protected. The class president (elected leader) represents everyone's interests, and there are rules (constitution) that even the president must follow.`,
    questions: [
      'What is the difference between direct and representative democracy?',
      'Why is separation of powers important in a democracy?',
      'What are the challenges facing modern democracies?'
    ]
  },
  'algorithm': {
    explanation: `An algorithm is a step-by-step procedure or formula for solving a problem. It takes input, processes it through a series of well-defined instructions, and produces output. Good algorithms are efficient, correct, and terminate in finite time. They form the foundation of computer programming and problem-solving.`,
    analogy: `Think of an algorithm like a cooking recipe. A recipe has ingredients (input), step-by-step instructions (process), and produces a dish (output). Just as following a recipe correctly gives you the same dish every time, an algorithm produces consistent results when given the same input.`,
    questions: [
      'What makes an algorithm efficient?',
      'Explain the difference between an algorithm and a program.',
      'What is the importance of algorithm analysis?'
    ]
  },
  'climate': {
    explanation: `Climate change refers to long-term shifts in global temperatures and weather patterns. While climate naturally varies, human activities since the 1800s have been the main driver, primarily through burning fossil fuels which releases greenhouse gases. These gases trap heat, causing global warming, rising sea levels, and extreme weather events.`,
    analogy: `Think of Earth like a car parked in the sun with windows closed. The glass lets sunlight in but traps heat inside, making it hotter. Greenhouse gases act like that glass - they let sunlight reach Earth but trap heat in the atmosphere, causing the planet to warm up gradually.`,
    questions: [
      'What are the main greenhouse gases and their sources?',
      'How does climate change affect ocean ecosystems?',
      'What are some solutions to reduce climate change?'
    ]
  },
  'dna': {
    explanation: `DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information in all living organisms. It has a double helix structure made of nucleotides containing four bases: Adenine, Thymine, Guanine, and Cytosine. DNA stores instructions for building proteins and is passed from parents to offspring, determining inherited traits.`,
    analogy: `Think of DNA like a recipe book for building and running your body. Each gene is a recipe (instruction) for making a specific protein. Just as a cookbook is passed down through generations with family recipes, DNA is passed from parents to children, carrying traits like eye color and height.`,
    questions: [
      'How does DNA replication work?',
      'What is the relationship between DNA, genes, and chromosomes?',
      'How do mutations in DNA occur and what are their effects?'
    ]
  },
  'electricity': {
    explanation: `Electricity is the flow of electric charge, typically carried by electrons moving through a conductor. It's measured in amperes (current), volts (potential difference), and ohms (resistance). Ohm's Law (V=IR) describes the relationship between these quantities. Electricity can be static (stationary charge) or current (flowing charge).`,
    analogy: `Think of electricity like water flowing through pipes. Voltage is like water pressure pushing the water, current is the amount of water flowing, and resistance is like the pipe's narrowness that restricts flow. Just as more pressure pushes more water through pipes, more voltage pushes more current through wires.`,
    questions: [
      'What is the difference between AC and DC current?',
      'Explain series and parallel circuits.',
      'How do insulators and conductors differ?'
    ]
  },
  'shakespeare': {
    explanation: `William Shakespeare (1564-1616) was an English playwright and poet, widely regarded as the greatest writer in the English language. He wrote 37 plays including tragedies (Hamlet, Macbeth), comedies (A Midsummer Night's Dream), and histories (Henry V). His works explore universal themes of love, power, jealousy, betrayal, and human nature.`,
    analogy: `Think of Shakespeare like the Beatles of literature. Just as the Beatles revolutionized music and their songs are still popular today, Shakespeare revolutionized theater and his plays are still performed 400 years later. Both created timeless works that speak to human emotions across generations.`,
    questions: [
      'What are the main themes in Shakespeare\'s tragedies?',
      'How did Shakespeare influence the English language?',
      'Why are Shakespeare\'s works still relevant today?'
    ]
  },

  // Default fallback
  'default': {
    explanation: `This is a demo response. In a real scenario, Amazon Nova Micro would analyze your question and provide a detailed explanation tailored to your selected level. The AI would break down complex concepts into simple, understandable parts with clear examples.`,
    analogy: `Think of learning like building with LEGO blocks. Each concept is a block, and understanding how they connect helps you build bigger ideas. Just like you start with simple blocks before building complex structures, learning starts with basic concepts before tackling advanced topics.`,
    questions: [
      'What are the key components of this concept?',
      'How does this concept apply in real-world scenarios?',
      'What are common misconceptions about this topic?'
    ]
  }
};
