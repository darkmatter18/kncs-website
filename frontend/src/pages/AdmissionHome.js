import React from 'react'
import Header from "../components/Header";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {ADMISSION_NEW} from "../routes/route";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowForward} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(6)
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        textDecoration: 'none'
    }
}))

const AdmissionHome = () => {
    const classes = useStyle()
    return (
        <React.Fragment>
            <Header/>
            <Container>
                <Card variant={"outlined"} className={classes.card}>
                    <CardContent>
                        <Typography variant={"body2"} align={"center"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies integer quis auctor elit sed vulputate mi. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Lacus vel facilisis volutpat est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Sed libero enim sed faucibus turpis in eu. Eget nunc scelerisque viverra mauris in. Amet facilisis magna etiam tempor. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Et leo duis ut diam quam. Congue nisi vitae suscipit tellus mauris a diam maecenas. Amet mauris commodo quis imperdiet massa. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Vehicula ipsum a arcu cursus. Varius duis at consectetur lorem donec massa. Condimentum id venenatis a condimentum. Pharetra magna ac placerat vestibulum.
                            Adipiscing vitae proin sagittis nisl. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Massa sed elementum tempus egestas sed sed. Ridiculus mus mauris vitae ultricies leo integer malesuada. Neque volutpat ac tincidunt vitae. Tristique risus nec feugiat in fermentum. Phasellus vestibulum lorem sed risus ultricies tristique. Non sodales neque sodales ut etiam sit. Neque gravida in fermentum et sollicitudin ac. Nullam non nisi est sit amet facilisis magna etiam. Amet nulla facilisi morbi tempus iaculis urna id volutpat. Rhoncus aenean vel elit scelerisque mauris pellentesque. In ornare quam viverra orci sagittis eu. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Diam phasellus vestibulum lorem sed risus ultricies. Nisi quis eleifend quam adipiscing. Sit amet nulla facilisi morbi. Dolor sit amet consectetur adipiscing elit duis tristique.
                            Turpis egestas pretium aenean pharetra magna ac. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Ante in nibh mauris cursus mattis molestie. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Nulla malesuada pellentesque elit eget gravida cum. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Facilisi etiam dignissim diam quis enim lobortis. Tristique senectus et netus et malesuada fames. Nisl nunc mi ipsum faucibus vitae aliquet. Eu volutpat odio facilisis mauris sit amet. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. At quis risus sed vulputate odio.
                            Ac turpis egestas sed tempus urna et. Quis ipsum suspendisse ultrices gravida. Et odio pellentesque diam volutpat commodo. Proin sagittis nisl rhoncus mattis rhoncus urna. Purus in massa tempor nec. At quis risus sed vulputate. Augue eget arcu dictum varius. At risus viverra adipiscing at in tellus integer. Ornare arcu odio ut sem nulla pharetra diam sit. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
                            Sodales ut eu sem integer. Aliquet porttitor lacus luctus accumsan tortor. Rhoncus urna neque viverra justo nec ultrices dui. Lobortis mattis aliquam faucibus purus. Dui faucibus in ornare quam viverra orci sagittis eu. Vitae auctor eu augue ut lectus arcu. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Habitant morbi tristique senectus et. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Dictum non consectetur a erat nam. Nisl vel pretium lectus quam id leo in vitae. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Purus viverra accumsan in nisl nisi. Ut placerat orci nulla pellentesque dignissim enim sit. Ultrices tincidunt arcu non sodales neque sodales ut.
                            Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Lacus laoreet non curabitur gravida arcu ac. Neque ornare aenean euismod elementum. Morbi tristique senectus et netus et. Sit amet nisl purus in mollis nunc sed id semper. Vestibulum lorem sed risus ultricies tristique nulla. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Neque vitae tempus quam pellentesque nec nam aliquam sem et. Habitasse platea dictumst vestibulum rhoncus. Ac odio tempor orci dapibus ultrices in iaculis nunc. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Semper auctor neque vitae tempus quam. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Ullamcorper sit amet risus nullam eget.
                            Semper viverra nam libero justo. Lorem ipsum dolor sit amet. Ullamcorper sit amet risus nullam eget felis eget nunc. Vulputate sapien nec sagittis aliquam malesuada bibendum. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Faucibus ornare suspendisse sed nisi lacus. Facilisi nullam vehicula ipsum a. Sit amet mauris commodo quis imperdiet massa tincidunt nunc. Enim ut tellus elementum sagittis vitae. Purus in massa tempor nec feugiat nisl pretium fusce id. Quam id leo in vitae turpis massa sed. Cras sed felis eget velit aliquet sagittis id consectetur. Tortor vitae purus faucibus ornare suspendisse sed. Elementum integer enim neque volutpat ac tincidunt vitae. Aenean pharetra magna ac placerat vestibulum lectus mauris. Purus sit amet luctus venenatis lectus magna fringilla. In hac habitasse platea dictumst vestibulum rhoncus. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Donec et odio pellentesque diam.
                            Aliquam ut porttitor leo a diam. Quis blandit turpis cursus in hac habitasse. At in tellus integer feugiat scelerisque. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Massa ultricies mi quis hendrerit dolor magna. Ut morbi tincidunt augue interdum velit euismod in. Justo eget magna fermentum iaculis eu non diam phasellus. Pharetra pharetra massa massa ultricies mi quis. Sagittis vitae et leo duis ut diam quam. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Sit amet consectetur adipiscing elit pellentesque habitant.
                            Risus pretium quam vulputate dignissim. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Nisl condimentum id venenatis a. Odio tempor orci dapibus ultrices. Turpis nunc eget lorem dolor sed. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Nulla aliquet enim tortor at. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Augue neque gravida in fermentum. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Tristique senectus et netus et malesuada fames. Id aliquet lectus proin nibh. Pretium aenean pharetra magna ac. Leo urna molestie at elementum eu facilisis. Sagittis orci a scelerisque purus semper.
                        </Typography>
                        <Grid container justify={"center"}>
                            <Grid item>
                                <Link to={ADMISSION_NEW} className={classes.button}>
                                    <Button variant={"outlined"} className={classes.button} color={"primary"}>
                                        Proceed to Application <ArrowForward/>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionHome