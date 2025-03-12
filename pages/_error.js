function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} happened on our end. Don't worry, this will be fixed soon!`
        : 'An error occurred on your end, that's all we know.'}
    </p>
  )
}
 
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
 
export default Error
