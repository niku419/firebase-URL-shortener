import React,{ useEffect } from 'react'
import { database } from '../firebase'
import { useParams} from 'react-router-dom'

export default function RedirectPage() {

  const {id=null} = useParams()

  useEffect(() => {
    if(id){
      database.urlDetails
      .where("shortUrl", "==",`https://react-firebase-url-shorten.web.app/${id}`)
      .onSnapshot(res => {
        res.docs.map(value => {
          return window.location.href = value.data().longUrl
        })
      })
    }
  }, [id])

  return (
    <div style={{display: "grid", placeItems: "center"}}>
      Redirecting...
    </div>
  )
}
