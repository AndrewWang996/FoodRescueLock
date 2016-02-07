int lockPin = 6;
String inputString = "";
boolean stringComplete = false;

void setup() {
  pinMode(lockPin, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(200);
}

void loop() {
  if (stringComplete){
    Serial.println("Unlocked");
    digitalWrite(lockPin, HIGH);
    inputString = "";
    stringComplete = false;
    delay(5000);
    digitalWrite(lockPin,LOW);
  }
  delay(10);
}
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
