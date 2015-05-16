package main

import (
	"github.com/bradgignac/concourse-playground/fortune-api/Godeps/_workspace/src/github.com/rs/cors"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://foo.com"},
	})

	m := martini.Classic()
	m.Use(render.Renderer())
	m.Use(c.HandlerFunc)

	m.Get("/", func(r render.Render) {
		r.JSON(200, map[string]interface{}{"hello": "world"})
	})

	m.Run()
}
