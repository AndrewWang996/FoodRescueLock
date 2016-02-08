/*
// for servos
#include <Servo.h>

Servo myservo;
int servoPin = 12;
int lock = 0; // lock angle (should be 0)
int unlock = 180; // unlock angle (should be 180)
*/

int lockPin = 6;
String inputString = "";
boolean stringComplete = false;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

/*
  // for servos
  myservo.attach(servoPin);
  myservo.write(lock);
  */

  // for lock
  pinMode(lockPin, OUTPUT);
  inputString.reserve(200);
}

void loop() {
  /*
  if(stringComplete) {
    digitalWrite(lockPin, HIGH);
    inputString = "";
    stringComplete = false;
    delay(5000);
    // digitalWrite(lockPin, LOW);
  }
  delay(10);
  */
  
  // Recieve data from Node and write it to a String
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if(inChar == 'V'){ // end character for locking
      Serial.println("L");
      // myservo.write(lock); // this is for servos
      digitalWrite(lockPin, LOW);
      delay(3000);
    }
    else if(inChar == 'W'){
      Serial.println("U");
      // myservo.write(unlock); // this is for servos
      digitalWrite(lockPin, HIGH);
      delay(3000);
    }
  }  
}

/*
void serialEvent() {
  while(Serial.available()) {
    char inChar = (char)Serial.read();

    inputString += inChar;

    if(inChar == '\n') {
      stringComplete = true;
    }
  }
}

*/



