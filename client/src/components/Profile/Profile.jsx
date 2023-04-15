import { Container, Row } from 'react-bootstrap';
import { Img } from './Profile.styles';
const Profile = ({ winner, props }) => {
    const winnerStyles = {
        fontWeight: 600,
        color: '#07DA07'
    }

    return (
        <Container>
            <Row>
                <div className=" col-md-6 mx-auto">
                    {winner === props.name ? (
                        <>
                            <div className='text-center'>
                                <h2 style={winnerStyles}>Winner!!!</h2>
                            </div>

                            <h3 style={{ fontWeight: '600' }} className='text-center'>{props.name}'s Profile</h3>
                            <h3>Username: {props.username}</h3>
                        </>
                    ) : (
                        <>
                            <br />
                            <h3 style={{ fontWeight: '600' }} className='text-center'>{props.name}'s Profile</h3>
                            <h3>Username: {props.username}</h3>
                        </>
                    )}

                    <p >
                        Location: {props.location}
                        <br />
                        Bio:    {props.bio}
                        <br />
                        Titles: {props.titles}
                        <br />
                        Favorite Language: {props["favorite-language"]}
                        <br />
                        Public Repositories: {props["public-repos"]}
                        <br />
                        {winner === props.name ? (
                            <>
                            Total Stars: <span style={winnerStyles}>{props["total-stars"]}</span>
                            </>
                        ) : (
                            <>
                            Total Stars: {props["total-stars"]}
                            </>
                        )}
                        
                        <br />
                        Highest Starred: {props["highest-starred"]}
                        <br />
                        Perfect Repositories: {props["perfect-repos"]}
                        <br />
                        Followers: {props.followers}
                        <br />
                        Following: {props.following}
                    </p>
                </div>
                <div className="col-md-4 mx-auto d-flex justify-content-center">
                    <Img
                        src={props.avatar_url}
                        alt="github avatar"
                    />
                </div>

            </Row>
            
        </Container>
    )
}

export default Profile;