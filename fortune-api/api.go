package main

import (
	"encoding/json"
	"net/http"
)

// NewAPI creates a new API server.
func NewAPI() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/fortune", fortune)

	return mux
}

func fortune(w http.ResponseWriter, req *http.Request) {
	h := w.Header()
	h.Add("Content-Type", "application/json; charset=utf-8")

	fortune := TellFortune()
	encoder := json.NewEncoder(w)
	encoder.Encode(fortune)
}
