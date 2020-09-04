import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(()=>({
    card: {
        width: '250px'
    },
    image: {
        height: '250px',
    },

}))

const DeveloperCard = ({personName, imageUrl, portfolioUrl, emailId}) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Card variant={"outlined"} className={classes.card}>
                <CardMedia className={classes.image} title={personName} image={imageUrl}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {personName}
                    </Typography>
                    <CardActions>
                        <Button size="small" color="primary" href={portfolioUrl}>
                            Portfolio
                        </Button>
                        <Button size="small" color="primary" href={`mailto:${emailId}`}>
                            Mail Him
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default DeveloperCard