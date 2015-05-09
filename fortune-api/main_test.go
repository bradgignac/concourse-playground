package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	result := m.Run()
	os.Exit(result)
}

func TestFortune(t *testing.T) {
	api := NewAPI()
	server := httptest.NewServer(api)
	url := server.URL

	response, err := http.Get(url + "/fortune")
	if err != nil {
		t.Error(err)
		return
	}
	defer response.Body.Close()

	fortune := map[string]string{}
	decoder := json.NewDecoder(response.Body)
	err = decoder.Decode(&fortune)
	if err != nil {
		t.Error(err)
		return
	}

	if _, ok := fortune["quote"]; !ok {
		t.Error("Quote attribute was not present")
	}

	if _, ok := fortune["author"]; !ok {
		t.Error("Author attribute was not present")
	}

	if _, ok := fortune["source"]; !ok {
		t.Error("Source attribute was not present")
	}
}
