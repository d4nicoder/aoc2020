import os
import time

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "input.txt")
f = open(filename, "r")

start = int(round(time.time() * 1000000))
numbers = []
for line in f:
    numbers.append(int(line.strip()))

for i, num in enumerate(numbers):
    for n in range(i+1, len(numbers)):
        if numbers[i] + numbers[n] == 2020:
            result = numbers[i] * numbers[n]
            end = int(round(time.time() * 1000000))
            print(numbers[i], numbers[n])
            print('Result {:d}'.format(result))
            elapsed_time = end - start
            print('Time elapsed: {:f} seconds'.format(elapsed_time / 1000000))
