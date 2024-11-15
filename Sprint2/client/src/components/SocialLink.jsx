const SocialLink = ({ link, itemClass }) => {
    return (
      <li key={link.id}>
        <a href={link.href} className={itemClass} target="_blank" rel="noreferrer">
          <img src={link.icon} alt={`${link.id} icon`} className="w-12 h-12" />
        </a>
      </li>
    );
  };
  
  export default SocialLink;
  