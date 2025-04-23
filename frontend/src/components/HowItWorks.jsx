function HowItWorks() {
  return (
    <section className="relative w-full h-screen">
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
    </section>
  );
}

export default HowItWorks;