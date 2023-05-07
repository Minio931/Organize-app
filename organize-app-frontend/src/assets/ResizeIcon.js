const ResizeIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrows-move-vertical"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 18l3 3l3 -3"></path>
      <path d="M12 15v6"></path>
      <path d="M15 6l-3 -3l-3 3"></path>
      <path d="M12 3v6"></path>
    </svg>
  );
};

export default ResizeIcon;
