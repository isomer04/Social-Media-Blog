
// const Footer = () => {
//   return (
//     <footer className="bg-blue-500 p-4 text-white text-center">
//       &copy; {new Date().getFullYear()} Social Media App. All rights reserved.
//     </footer>
//   );
// };

// export default Footer;



const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center text-white">
          <p>&copy; {new Date().getFullYear()} Social Media App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
