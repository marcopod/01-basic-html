function MainInfo() {
  return (
    <main className="mx-auto p-4">
      <section className="mb-4">
        <h2 className="text-lg font-semibold">Sobre mi</h2>
        <p>Estudiante de ITC</p>
      </section>
      <section className="mb-4">
        <h2 className="text-lg font-semibold">Experiencia</h2>
        <ul className="list-disc pl-5">
          <li>Co-founder at The Hub (2023 - present)</li>
          <li>Co-founder at Scholarvy (2023 - present)</li>
          <li>President, 0xTec cryptoDevClub (2023 - present)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Educacion</h2>
        <p>BSc in Computer Science from Tec de Monterrey (2021 - 2025)</p>
      </section>
    </main>
  );
}

export default MainInfo;
