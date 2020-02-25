import { NextPage } from 'next';
import Layouts from '../Components/layout';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layouts>
        <h1 >Hello world! - user agent: {userAgent}</h1>
    </Layouts>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default Home;
