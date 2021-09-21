const index = () => {
	return null;
};

export async function getStaticProps() {
	return {
		redirect: {
			destination: "/experiences",
			permanent: false,
		},
	};
}

export default index;
