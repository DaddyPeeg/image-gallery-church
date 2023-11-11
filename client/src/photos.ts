const breakpoints = [2400, 1080, 640, 384, 256, 128, 96, 64, 48];

// const unsplashLink = (id: string, width: number, height: number, format: string) =>
//   `https://source.unsplash.com/${id}/${width}x${height}`;
//   `https://res.cloudinary.com/dl4nowlvv/image/upload/f_auto/q_auto/c_scale,w_${width}/imagegallery/${id}.${format}`;

const unsplashLink = (public_id: string, width: number, format: string) =>
  `https://res.cloudinary.com/dl4nowlvv/image/upload/f_auto/q_auto/c_scale,w_${width}/${public_id}.${format}`;

// const unsplashPhotos = [
//   { id: "8gVv6nxq6gY", width: 1080, height: 800 },
//   { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
//   { id: "RkBTPqPEGDo", width: 1080, height: 720 },
//   { id: "Yizrl9N_eDA", width: 1080, height: 721 },
//   { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
//   { id: "Jztmx9yqjBw", width: 1080, height: 607 },
//   { id: "-heLWtuAN3c", width: 1080, height: 608 },
//   { id: "xOigCUcFdA8", width: 1080, height: 720 },
//   { id: "1azAjl8FTnU", width: 1080, height: 1549 },
//   { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
//   { id: "twukN12EN7c", width: 1080, height: 694 },
//   { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
//   { id: "sEXGgun3ZiE", width: 1080, height: 720 },
//   { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
//   { id: "q-motCAvPBM", width: 1080, height: 1620 },
//   { id: "Xn4L310ztMU", width: 1080, height: 810 },
//   { id: "iMchCC-3_fE", width: 1080, height: 610 },
//   { id: "X48pUOPKf7A", width: 1080, height: 160 },
//   { id: "GbLS6YVXj0U", width: 1080, height: 810 },
//   { id: "9CRd1J1rEOM", width: 1080, height: 720 },
//   { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
// ];
function processImages(cloudImage) {
  const photos = cloudImage.map((photo) => {
    const width = breakpoints[0];
    const public_id = photo.public_id;
    const format = photo.format;
    const asset_id = photo.asset_id;
    const created_at = photo.created_at;
    return {
      src: unsplashLink(photo.public_id, width, photo.format),
      width,
      public_id,
      format,
      asset_id,
      created_at,
      srcSet: breakpoints.map((breakpoint) => {
        return {
          src: unsplashLink(photo.public_id, breakpoint, photo.format),
          width: breakpoint,
        };
      }),
    };
  });
  return photos;
}
export default processImages;
