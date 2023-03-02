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
         
        </tbody>
      </table>
    </div>
  )
}

