import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFoundView = () => (
	<div className="text-center">
		<h2>Tady nic není :(</h2>
		<p>Ale můžeš si napsat vlastní nákup!</p>
		<div className="action-zone form-group">
			<Link to="/" className="btn btn-primary btn-block-xxs">
				Napsat nákup
			</Link>
		</div>
	</div>
)

export default PageNotFoundView