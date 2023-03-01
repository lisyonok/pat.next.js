import Link from "next/link"

export default function FirstPost({ posts = [] }) {
  //console.log(posts)
  return (
    <div>
      <Link href="/">
        TO MAIN
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Name</th>
            <th>Salary</th>
            <th>age</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((f,i) => (
            <tr key={i}>
              <td>{f.id}</td>
              <td>{f.employee_name}</td>
              <td>{f.employee_salary}</td>
              <td>{f.employee_age}</td>
              <td>{f.profile_image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://e-krit.ru/test.json")
  console.log('success')
  const posts = await res.json()
  return {
    props: {
      posts: posts.data
    }
  }
}
