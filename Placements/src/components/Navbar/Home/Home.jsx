import './Home.css';

const Home = () => {
    return (
        <div className='contain'>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://img.collegepravesh.com/2018/06/IIIT-Bhopal.png" className="d-block w-100 hello" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://images.shiksha.com/mediadata/images/articles/1669012707php828CAD.jpeg" className="d-block w-100 hello" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.shiksha.com/mediadata/images/articles/1685100026phpORyxsP.jpeg" className="d-block w-100 hello" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <h1 className="newclass">Our Students Get Hired At</h1>
            <div className="company-section">
                <div className="company-marquee">
                    <span>Google</span>
                    <span>Microsoft</span>
                    <span>Amazon</span>
                    <span>Facebook</span>
                    <span>Apple</span>
                    <span>Netflix</span>
                    <span>Google</span>
                    <span>Microsoft</span>
                    <span>Amazon</span>
                    <span>Facebook</span>
                    <span>Apple</span>
                    <span>Netflix</span>
                </div>
            </div>
        </div>
    );
}

export default Home;


  