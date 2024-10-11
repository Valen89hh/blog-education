interface LogoProps{
    color?: "dark" | "light"
    size?: number
}

const LogoDark: React.FC<LogoProps> = ({
    size = 1,
    color = "light"
}) => {
    return ( 
        <svg width={97*size} height={50*size} viewBox="0 0 97 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 17C53.6742 19.2232 57.2349 21.9196 58 29.0423V36H44V24.7606H47.5745C47.1507 22.892 46.6821 21.9911 44 21.5493V17Z" fill="#FF0000"/>
            <path d="M73 36C63.3258 33.7768 59.7651 31.0804 59 23.9577V17H73V28.2394H69.4255C69.8493 30.108 70.3179 31.0089 73 31.4507V36Z" fill="#3B5998"/>
            <path d="M11.52 27.72H21.24V36H2.16V10.8H11.52V27.72ZM32.7811 16.38C34.1731 16.38 35.4811 16.644 36.7051 17.172C37.9291 17.7 38.9971 18.42 39.9091 19.332C40.8211 20.244 41.5411 21.312 42.0691 22.536C42.5971 23.76 42.8611 25.068 42.8611 26.46V28.26H31.3411C31.4371 28.644 31.6171 28.98 31.8811 29.268C32.0971 29.532 32.4211 29.76 32.8531 29.952C33.2851 30.144 33.8611 30.24 34.5811 30.24C35.0371 30.24 35.4571 30.168 35.8411 30.024C36.2491 29.88 36.5971 29.712 36.8851 29.52C37.2211 29.304 37.5331 29.064 37.8211 28.8L40.8811 33.66C40.3531 34.188 39.7051 34.668 38.9371 35.1C38.2891 35.46 37.4971 35.784 36.5611 36.072C35.6251 36.384 34.5451 36.54 33.3211 36.54C31.7851 36.54 30.3691 36.276 29.0731 35.748C27.7771 35.22 26.6491 34.5 25.6891 33.588C24.7531 32.676 24.0211 31.608 23.4931 30.384C22.9651 29.16 22.7011 27.852 22.7011 26.46C22.7011 25.068 22.9651 23.76 23.4931 22.536C24.0211 21.312 24.7411 20.244 25.6531 19.332C26.5651 18.42 27.6331 17.7 28.8571 17.172C30.0811 16.644 31.3891 16.38 32.7811 16.38ZM34.4011 24.84C34.4011 24.12 34.2451 23.58 33.9331 23.22C33.6211 22.86 33.2371 22.68 32.7811 22.68C32.3251 22.68 31.9411 22.86 31.6291 23.22C31.3171 23.58 31.1611 24.12 31.1611 24.84H34.4011Z" fill={color == "light" ? "white" : "#121416"}/>
            <path d="M88.48 16.38C89.368 16.38 90.208 16.572 91 16.956C91.792 17.316 92.476 17.88 93.052 18.648C93.652 19.416 94.12 20.412 94.456 21.636C94.792 22.836 94.96 24.264 94.96 25.92V36H86.32V25.92C86.32 25.2 86.164 24.66 85.852 24.3C85.564 23.94 85.24 23.76 84.88 23.76C84.52 23.76 84.184 23.94 83.872 24.3C83.584 24.66 83.44 25.2 83.44 25.92V36H74.8V16.92H83.08L83.8 19.08C84.112 18.6 84.484 18.156 84.916 17.748C85.3 17.412 85.78 17.1 86.356 16.812C86.956 16.524 87.664 16.38 88.48 16.38Z" fill={color == "light" ? "white" : "#121416"}/>
        </svg>
     );
}
 
export default LogoDark;