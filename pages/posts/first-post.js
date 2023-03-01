export default function FirstPost({ posts = [] }) {
  console.log(posts)
  return (
    <div>
      <table class="table table-striped">
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
          {posts.map((f) => (
            <tr>
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

export async function getStaticProps() {
  const res = await fetch("https://dummy.restapiexample.com/api/v1/employees")
  //console.log(await res.text())
  const posts = await res.json()
  return {
    props: {
      posts: posts.data
    }
  }
}
