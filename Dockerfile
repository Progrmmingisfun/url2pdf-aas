FROM debian


# continue on how to run the File_Converter.js page.

#Run apt update and install all nodejs npm on the image.
RUN apt update

#RUN apt install -y \
    #libgcc libstdc++ libx11 glib libxrender libxext libintl \
    #libcrypto1.0 libssl1.0

#RUN apt install -y libgcc,libstdc++,libx11,glib,libxrender,libxext,libintl,libcrypto1.0,libssl1.0

#RUN apt-get clean && apt-get update

#RUN apt update && apt-get install -y apt-utils

#RUN apt install dialog apt-utils -y


#RUN apt install -y apt-utils

RUN apt install -y nodejs npm


# Copy file into the url2pdf image directory
COPY . /url2pdf-aas


#----------

#Create app directory
WORKDIR /url2pdf-aas
EXPOSE 8080
CMD ["npm","start"]
