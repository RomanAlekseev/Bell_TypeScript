export function getCookie(name: string): any {

    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name: string, value: any, props: any): void {

    props = props || {};

    let exp = props.expires;

    if (typeof exp == "number" && exp) {

        let d = new Date();

        d.setTime(d.getTime() + exp*1000);

        exp = props.expires = d

    }

    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for(let propName in props){

        updatedCookie += "; " + propName;

        let propValue = props[propName];

        if(propValue !== true){ updatedCookie += "=" + propValue }
    }

    document.cookie = updatedCookie
}

export function deleteCookie(name: string): void
{
    document.cookie = name+'=; Max-Age=-99999999;';
}