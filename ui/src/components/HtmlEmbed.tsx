import React, { Component, RefObject } from 'react';

interface HtmlEmbedProps {
  htmlContent: string;
}

class HtmlEmbed extends Component<HtmlEmbedProps> {
  private iframeRef: RefObject<HTMLIFrameElement>;

  constructor(props: HtmlEmbedProps) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    // Insert the HTML content into the iframe
    const iframe = this.iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(this.props.htmlContent);
        doc.close();
      }
    }
  }

  render() {
    return <iframe style={{width:"500px", height:"800px"}} ref={this.iframeRef} />;
  }
}

export default HtmlEmbed;
