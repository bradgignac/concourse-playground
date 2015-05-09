package main

import (
	"math/rand"
	"time"
)

// Fortune represents a wise quote.
type Fortune struct {
	Quote  string `json:"quote"`
	Author string `json:"author"`
	Source string `json:"source"`
}

var seed = time.Now().Unix()
var source = rand.NewSource(seed)
var random = rand.New(source)

var database = []Fortune{
	Fortune{
		Quote:  "His mind is like a steel trap ― full of mice.",
		Author: "Foghorn Leghorn",
	},
	Fortune{
		Quote:  "A banker is a fellow who lends you his umbrella when the sun is shining and wants it back the minute it begins to rain.",
		Author: "Mark Twain",
	},
}

// TellFortune returns a random fortune from the database.
func TellFortune() Fortune {
	index := random.Intn(len(database))
	return database[index]
}
