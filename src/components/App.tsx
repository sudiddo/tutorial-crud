import { useEffect, useState } from 'react'
import services from 'utils/services'
import { Tutorial } from 'utils/types'

function App() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [selected, setSelected] = useState<Tutorial | null>(null)
  useEffect(() => {
    services
      .getAll()
      .then((res) => {
        setTutorials(res.data)
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data)
      })
  }, [])

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const published = data.get('published') === 'on' ? true : false
    data.set('published', published.toString())
    const payload = Object.fromEntries(data.entries())
    services
      .create(payload)
      .then(() => {
        services
          .getAll()
          .then((res) => {
            setTutorials(res.data)
          })
          .catch((err) => {
            if (err.response) console.log(err.response.data)
          })
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Tutorial BE Crud</h1>
        <div className="flex flex-row">
          <div className="my-5 flex flex-col rounded-md border border-black p-4">
            <h2 className="mb-3 text-lg font-semibold">Create Tutorial</h2>
            <form onSubmit={onCreate}>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <label htmlFor="title" className="w-40">
                    Title
                  </label>
                  <input
                    className="rounded-md border border-black px-3"
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>

                <div className="my-3 flex flex-row">
                  <label htmlFor="description" className="w-40">
                    Description
                  </label>
                  <textarea
                    className="h-[240px] rounded-md border border-black px-3"
                    name="description"
                    id="description"
                  />
                </div>

                <div className="flex flex-row">
                  <label htmlFor="published" className="w-40">
                    Published
                  </label>
                  <input
                    className="rounded-md border border-black"
                    type="checkbox"
                    name="published"
                    id="published"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-5 rounded-md border border-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="my-5 ml-5 flex w-[360px] flex-col rounded-md border border-black p-4">
            <h2 className="mb-3 text-lg font-semibold">List Tutorial</h2>
            <div className="flex flex-col">
              {tutorials
                .filter((el) => el.published === true)
                .map((tutorial: Tutorial) => (
                  <button
                    onClick={() => setSelected(tutorial)}
                    key={tutorial.id}
                    className="text-left"
                  >
                    <h3 className="font-semibold">{tutorial.title}</h3>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Selected Tutorial */}
        {selected && (
          <div className="flex max-w-[1024px] flex-col rounded-lg border border-black p-5">
            <div className="flex flex-row items-center justify-between">
              <h2 className="mb-3 text-lg font-semibold">Selected Tutorial</h2>

              <button
                onClick={() => setSelected(null)}
                className="rounded-md bg-black px-3 py-1 font-semibold text-white"
              >
                Close this shit
              </button>
            </div>
            <h1 className="mb-5 text-lg font-semibold capitalize">
              {selected.title}
            </h1>

            <p>{selected.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
