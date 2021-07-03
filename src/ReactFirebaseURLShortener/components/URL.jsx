import React, { useState } from 'react'
import {Container, Form, Button, Jumbotron, Alert, Spinner, Nav, Navbar} from 'react-bootstrap'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { database } from '../firebase'
import shortId from 'shortid'

export default function URL() {
  const [url, setUrl] = useState("")
  const [shorturl,setShorturl] = useState("")
  const [click, setClick] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clipboardClick, setClipboardClick] = useState(false)

  async function handleClick(e){
    e.preventDefault()
    setLoading(true)
    var shortUrl = `https://react-firebase-url-shorten.web.app/${shortId.generate()}`
    await database.urlDetails.add({
      longUrl: url,
      shortUrl: shortUrl
    })
    setShorturl(shortUrl)
    setClick(true)
    setUrl("")
    setLoading(false)
  }
  if(loading){
    return (
      <div style={{display: "grid", placeItems: "center"}}>
        <Spinner animation="grow" />
      </div>
    )
  }
  return (
    <Container className="pt-4">
      <Container>
        <Jumbotron>
          <h1 style={{textAlign: "center"}}>URL Shortener</h1>
          <div className="mt-5">
            <em>
              This URL Shortener is a tool that creates a short, unique URL that will redirect to the specific website of your choosing using Firebase & React
            </em>
          </div>
        </Jumbotron>
        <Form>
          <Form.Group>
            <div className="d-flex">
              <div className="flex-grow-1">
                <Form.Control 
                  type="text" 
                  onChange={e =>
                    setUrl(e.target.value)
                  } 
                  value={url}
                  placeholder="Enter URL to shorten..."
                  required
                />
              </div>
              <div>
                <Button type="submit" variant="outline-secondary" onClick={handleClick}>
                  Convert
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Container>
      {click && <Container>
        <Alert variant="secondary" className="d-flex justify-content-between">
          <Alert.Link href={shorturl}>
            <div className="pt-1">
              {shorturl}
            </div>
          </Alert.Link>
          <CopyToClipboard text={shorturl} onCopy={()=> setClipboardClick(true)}>
            {clipboardClick ?
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faClipboardCheck} />
            </Button> :
            <Button variant="outline-secondary">
                <FontAwesomeIcon icon={faClipboard} />
            </Button>}
        </CopyToClipboard>
        </Alert>
      </Container>}
      <Container>
			<Navbar bg="transparent" fixed="bottom" variant="light">
				<Navbar.Brand >
					<strong>Niku419</strong>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} /></Nav.Link>
					<Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon  icon={faLinkedinIn} /></Nav.Link>
					<Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram} /></Nav.Link>
					<Nav.Link href="#"><FontAwesomeIcon icon={faFacebookF} /></Nav.Link>
				</Nav>
				<Form inline>
					{/* <Nav className="mr-auto"> 
						<Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
					</Nav> */}
				</Form>
		</Navbar>
		</Container>
   </Container> 
  )
} 