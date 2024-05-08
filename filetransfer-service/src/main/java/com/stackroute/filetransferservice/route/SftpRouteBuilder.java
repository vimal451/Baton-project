//package com.stackroute.filetransferservice.route;
//
//import com.stackroute.filetransferservice.model.SftpChannel;
//import com.stackroute.filetransferservice.repository.SftpChannelRepository;
//import org.apache.camel.CamelContext;
//import org.apache.camel.Route;
//import org.apache.camel.builder.RouteBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.Optional;
//
//public class SftpRouteBuilder extends RouteBuilder {
//
//    private SftpChannel sftpChannel;
//
//    @Autowired
//    private SftpChannelRepository sftpChannelRepository;
//
//    @Autowired
//    public SftpRouteBuilder(SftpChannel sftpChannel){}
//
//    @Override
//    public void configure() throws Exception {
//        from("direct:start")
//                .process(exchange -> {
//                    String channelId = exchange.getIn().getBody(String.class);
//                    Optional<SftpChannel> channel = sftpChannelRepository.findById(channelId);
//                    if (channel.isPresent()) {
//                        CamelContext camelContext = exchange.getContext();
//                        camelContext.start();
//                        Route route = new Route("sftp-route-" + channelId);
//                        route.from("sftp://" + channel.get().getLocalUsername() + ":" + channel.get().getLocalPassword() + "@" + channel.get().getLocalHost() + "/" + channel.get().getLocalDirectory() + "?autoCreate=true&binary=true")
//                                .to("sftp://" + channel.get().getRemoteUsername() + ":" + channel.get().getRemotePassword() + "@" + channel.get().getRemoteHost() + "/" + channel.get().getRemoteDirectory());
//                        camelContext.addRoute(route);
//                        camelContext.startRoute(route);
//
//                    }
//                })
//                .end();
//        from("direct:stop")
//                .process(exchange -> {
//                    Long channelId = exchange.getIn().getBody(Long.class);
//                    SftpConfiguration configuration = new SftpConfigurationService().findById(channelId);
//                    if (configuration!= null) {
//                        CamelContext camelContext = exchange.getContext();
//                        camelContext.stopRoute("sftp-route-" + channelId);
//                    }
//                })
//                .end();
//    }
//    }
//}
