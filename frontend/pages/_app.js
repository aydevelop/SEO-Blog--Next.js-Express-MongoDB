import React from 'react'
import '../static/App.css'
import '../static/bootstrap.min.css'
import '.././node_modules/nprogress/nprogress.css'
import '.././node_modules/react-quill/dist/quill.snow.css'

import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = (url) => NProgress.done()
Router.onRouteChangeError = (url) => NProgress.done()

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
