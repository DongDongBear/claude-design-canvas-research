# REA 证据归档

超过5 MB的原始JSON以同名`.json.gz`压缩保存（先去除机器路径），解压后SHA见archive-manifest.json；originalLocalSha256记录去标识化前本机版本，不把公开副本称为逐字原始日志。原始命令README保留当时路径；复跑需从官方npm安装rea-agents@6.7.0到独立环境。node_modules、npm缓存、下载工具包和重复inputs未入库；输入源均在assets及project-files，inputs-manifest给出哈希。
