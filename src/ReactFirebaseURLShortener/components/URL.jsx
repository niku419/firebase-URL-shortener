import React, { useState } from 'react'
import {Container, Form, Button, Alert, Spinner, Nav, Navbar} from 'react-bootstrap'
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
    <Container className="pt-5 main">
      <Container>
        <div className="pb-5 bord">
          <h1 className="heading"><span className="url">URL</span> Shortener</h1>
          <div className="mt-4 text-center">
            <em className="description">
              This URL Shortener is a tool that creates a short, unique URL that will redirect to the specific website of your choosing using Firebase & React
            </em>
          </div>
        </div>
        <Form className="mt-4">
          <Form.Group>
            <div className="d-flex" >
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
                <Button type="submit" className="ml-2 button" onClick={handleClick}>
                  Convert
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Container>
      {click && <Container>
        <Alert variant="warning" className="d-flex justify-content-between">
          <Alert.Link href={shorturl}>
            <div className="pt-1">
              {shorturl}
            </div>
          </Alert.Link>
          <CopyToClipboard text={shorturl} onCopy={()=> setClipboardClick(true)}>
            {clipboardClick ?
            <Button variant="light">
              <FontAwesomeIcon icon={faClipboardCheck} color="#e85a4f"/>
            </Button> :
            <Button variant="light">
                <FontAwesomeIcon color="#e85a4f" icon={faClipboard} />
            </Button>}
        </CopyToClipboard>
        </Alert>
      </Container>}
      <Container>
        <Navbar bg="transparent" fixed="bottom" variant="light">
          <Navbar.Brand >
            <strong style={{color: "#e8584f"}}>Niku419</strong>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon color="#e8584f" icon={faGithub} /></Nav.Link>
            <Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon color="#e8584f"  icon={faLinkedinIn} /></Nav.Link>
            <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon color="#e8584f"  icon={faInstagram} /></Nav.Link>
            <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon color="#e8584f" icon={faFacebookF} /></Nav.Link>
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