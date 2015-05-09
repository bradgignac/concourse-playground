package main

import (
	"fmt"
	"os"

	"github.com/bradgignac/concourse-playground/fortune-api/Godeps/_workspace/src/github.com/codegangsta/cli"
	"github.com/bradgignac/concourse-playground/fortune-api/Godeps/_workspace/src/github.com/codegangsta/negroni"
)

const name = "fortuned"
const usage = "Serve up RESTful fortunes."
const version = "0.0.0"

var authors = []cli.Author{
	cli.Author{Name: "Brad Gignac", Email: "bgignac@bradgignac.com"},
}

func main() {
	app := cli.NewApp()
	app.Name = name
	app.Usage = usage
	app.Version = version
	app.Authors = authors

	app.Action = serve
	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "host",
			Value: "0.0.0.0",
			Usage: "HTTP server host",
		},
		cli.IntFlag{
			Name:  "port",
			Value: 8080,
			Usage: "HTTP server port",
		},
	}

	app.Run(os.Args)
}

func address(host string, port int) string {
	return fmt.Sprintf("%s:%d", host, port)
}

func serve(c *cli.Context) {
	addr := address(c.String("host"), c.Int("port"))
	api := NewAPI()

	server := negroni.New()
	server.Use(negroni.NewRecovery())
	server.Use(negroni.NewLogger())
	server.UseHandler(api)
	server.Run(addr)
}
