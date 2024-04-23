
const JobPosting = ({by, time, title, url}) => {


    const Post_Time=new Date(time*1000).toLocaleString()
   
    return (
        <div className="post">
            <h2 className="post-title">    
        <a
        className={url ? " " : "inactiveLink"}
            href={url}
            target="_blank"
            rel="noopener"
            >
            {title}
            </a>
            </h2>
            <span className="post-metadata">By {by}   {Post_Time}</span>
        </div>
    )
}

export default JobPosting
