module.exports = {
  personBuilder: (body) => {
    const {
      firstName, lastName, alias, dateOfBirth, status, sex, city, address, state, zip,
      profession, degree, maritalStatus, bodyType, eyeColor, skinColor, hairType, height, weight,
      tattoos, drugs, amputhee, mental, diseases, registry, driverLicense, birthCertificate, professionalLicense,
      economicReg,
    } = body;
    return {
      name: { firstName, lastName, alias },
      dateOfBirth,
      status,
      sex,
      locations: {
        ofBirth: {
          city, address, state, zip,
        },
        // geoReferences: [{
        //   geoHash: String,
        //   timestamps: { createdAt: 'createdAt' },
        // }],
      },
      background: { profession, degree, maritalStatus },
      // picture: String, // <<<<<<< ---- FIX THIS!!!!
      appearance: {
        bodyType, eyeColor, skinColor, hairType, height, weight, tattoos,
      },
      health: {
        drugs, amputhee, mental, diseases,
      },
      documents: {
        registry, economicReg, driverLicense, birthCertificate, professionalLicense,
      },
    };
  },
  userBuilder: (body) => {
    const {
      firstName, lastName, username, email,
      organization, dateOfBirth, role, password,
    } = body;
    return {
      name: { firstName, lastName },
      email,
      username,
      password,
      organization,
      role,
      dateOfBirth,
    };
  },
};
