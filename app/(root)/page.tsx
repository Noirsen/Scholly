export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  //const posts = [
  //{
  // _createAt: new Date(),
  //views: 55,
  //author: { _id: 1, name: "MbakSilvana" },
  //_id: 1,
  //description: "this is a desctiption",
  //image: "https://wallpapercave.com/wp/wp3803471.jpg",
  //category: "Robots",
  //title: "We Robot",
  //},
  //];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Temukan Impian mu, <br />
          Hanya untuk di injak sama orang berduit
        </h1>

        <p className="sub-heading !max-w-3xl">
          Temukan Impian, Raih Beasiswa, dan jadi boneka bagi orang berduit.
        </p>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
      </section>
    </>
  );
}
