export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await new Promise(resolve => setTimeout(resolve, 800))

  return {
    success: true,
    message: 'Booking submitted successfully',
    bookingId: 'BK-' + Date.now(),
    data: body
  }
})
