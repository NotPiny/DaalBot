# Its a work in progress btw
import time
from pynput.keyboard import Key, Controller
def pressKey(key):
    keyboard = Controller()
    keyboard.press(key)
    keyboard.release(key)

text = '!'

for char in text:
    pressKey(char)

time.sleep(1)
pressKey(Key.tab)