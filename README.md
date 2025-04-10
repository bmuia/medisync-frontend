### HEALTH INFORMATION EXCHANGE

## PROJET OVERVIEW
HIE is a platform designed to enable hospitals and healthcare providers to securely share patient data. the primary goal is to improve the  coordination of care, enhance patient safety and streamline clinical processes by allowing authorised personell to access acurate health information across diffrent hospitals.

## FEATURES
- Real time access to patient records
- Secure data sharing across hospitals,clinic and healthcare providers
- Encryption and compliance with HIPAA standards
- Role based authentication and proper authorisation
- Downloading patient records in pdf format

## TECHNOLOGIES USED
- **backend**: django,redis
- **frontend**: react.js,tailwind css
- **database**: postgresql
- **API**: FHIR(Fast healthcare interopelability resources )
- **authentication**: JWT

## INSTALLATION INSTRUCTIONS
### PREREQUISITES 
- Python 3.12.1
- Postgresql >= 16
- React.js

### Steps
1. Clone as repository:
 ```bash
   git clone https://github.com/bmuia/medisync-frontend.git 
   ``` 
2. Navigate to the directory and install dependancies:

```bash
   cd medisync-frontend
   npm install
   npm install tailwindcss @tailwindcss/vite
   ```
3. Run the development server:
```bash 
   npm run dev
   ```

## Usage
- Access the platform by navigating to **http://localhost:5173**
- log in via login dashboard
- use the provided API endpoints to interact with healthcare data

## Contributing 
We welcome contributions! To contribute: 
1. Fork the repository.
2. Create a new branch("git checkout -b feature/your feature")
3. Commit your changes("git commit -am 'add new feature'")
4. Push to the branch("git push origin feature/your feature")
5. Open a pull request 

## Licence
This project is licenced under the MIT licence -see the [LICENCE](LICENCE) File for details. 

## Acknowledgements 
- Thanks to the developers for providing an ease to use API framework
- Special thanks to [Austin Odera](aodera@usiu.ac.ke) for providing the idea.

##  Security
. The system complies with HIPAA standards for patient data protection
. Authentication uses JWT tokens for secure access


