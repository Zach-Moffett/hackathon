> QUICK EXPLANATION OF DEVELOPMENT

This application uses Javascript to sort/output the data.

First grabs the data from a local JSON file and organizes it into an array of objects. The key to each object is the Pitcher ID which makes filtering by pitcher fast

After the user selects their pitcher, another array of objects is created which loops through all pitches by that pitcher seperating the pitches by type (slider/fastball/etc). Every field is added to get a running total for that pitch 

Then the same process is used to average out each pitch for spin/speed/etc

The location zone is broken up into 4 areas that pitches are located. High/Left High/Right Low/Left and Low/Right. These are also a running total which makes is better than doing an average since that does not show you exactly where the pitch should be expected. For example if there are 2 pitches one outside and one inside the average would be right down the middle which is incorrect. 
