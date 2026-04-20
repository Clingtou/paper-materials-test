%% setup
clc;
clear;
root_path = pwd;
addpath(genpath(root_path));
nsub = 100;
ngain=7;
nloss=7;
gamble_data =readtable([root_path,'\data\Data_exp1.csv']);

%%  Fig1B:  Gamble Choice Matrix (group-level)
for icondition = 0:1
    for igain=1:ngain
        for iloss=1:nloss
            size=gamble_data(gamble_data.Gain==igain+2 & ...
                gamble_data.Loss==iloss+2 & gamble_data.Fontsize== icondition,:);
            prob_accept.matrix.group(icondition+1).value(igain,iloss)=mean(size.Choice);
        end
    end
end

for icondition=0:1
    figure('Renderer', 'painters', 'Position', [560 400 420 370]);
    A=prob_accept.matrix.group(icondition+1).value;
    h=imagesc(A);
    fs_axis  = 12;
    fs_label = 14;
    fs_title = 14;
    cmap_up=[linspace(1,192/256,1000)',linspace(1,0,1000)',linspace(1,0,1000)'];
    cmap_down=[linspace(0/256,1,1000)',linspace(32/256,1,1000)',linspace(102/256,1,1000)'];
    cmap=[cmap_down;cmap_up];
    colormap(cmap);

    set(gca,'TickDir','out', 'Box','on','FontSize',fs_axis, 'FontName','Arial', ...
        'TickLength',[0.015 0.015], ...
        'LineWidth',0.6);
    ax = gca;
    ax.XAxis.TickLabelGapOffset = 0;
    ax.YAxis.TickLabelGapOffset = 2.5;
    xl = ax.XLabel; yl = ax.YLabel;
    set([xl yl], 'Units','points');
    set(xl, 'Position', xl.Position + [0 0 0]);
    set(yl, 'Position', yl.Position + [-2 0 0]);
    xlabel('Potential Losses (¥)','FontSize',fs_label,'FontName','Arial');
    ylabel('Potential Gains (¥)','FontSize',fs_label,'FontName','Arial');
    axis square
    xticks(1:7);
    yticks(1:7);
    xticklabels({'3','4','5','6','7','8','9'});
    yticklabels({'3','4','5','6','7','8','9'});
    clim([0 1]);
    cb = colorbar;cb.FontSize = fs_axis;cb.FontName = 'Arial';
    cb.Ticks  = linspace(0, 1, 3);cb.TickLabels = compose('%.1f', cb.Ticks);%
    cb.Title.String = 'Prob';cb.Title.FontSize = fs_title;cb.Title.FontName = 'Arial';
    cb.Title.Units = 'normalized';
    cb.Title.Position(2) = cb.Title.Position(2) + 0.05;
    hold on
    print(1, '-dtiff', [root_path,'\figure\Figure1B_fontsize',num2str(icondition,'%.1d'),'.tiff'], '-r200');
    close;
end

%%  Fig S1:  EV: Matrix figure (group-level)
for igain=1:ngain
    for iloss=1:nloss
        size=gamble_data(gamble_data.Gain==igain+2 & ...
            gamble_data.Loss==iloss+2,:);
        ev.matrix.value(igain,iloss)=mean(size.EV);
    end
end

figure('Renderer', 'painters', 'Position', [560 400 420 370]);
A=ev.matrix.value;
h=imagesc(A);
fs_axis  = 12;
fs_label = 14;
fs_title = 14;
cmap_up=[linspace(1,192/256,1000)',linspace(1,0,1000)',linspace(1,0,1000)'];
cmap_down=[linspace(0/256,1,1000)',linspace(32/256,1,1000)',linspace(102/256,1,1000)'];
cmap=[cmap_down;cmap_up];
colormap(cmap);
set(gca,'TickDir','out', 'Box','on','FontSize',fs_axis, 'FontName','Arial', ...
    'TickLength',[0.015 0.015], ...
    'LineWidth',0.6);
ax = gca;
ax.XAxis.TickLabelGapOffset = 0;
ax.YAxis.TickLabelGapOffset = 2.5;
xl = ax.XLabel; yl = ax.YLabel;
set([xl yl], 'Units','points');
set(xl, 'Position', xl.Position + [0 0 0]);
set(yl, 'Position', yl.Position + [-2 0 0]);
xlabel('Potential Losses (¥)','FontSize',fs_label,'FontName','Arial');
ylabel('Potential Gains (¥)','FontSize',fs_label,'FontName','Arial');
axis square
xticks(1:7);
yticks(1:7);
xticklabels({'3','4','5','6','7','8','9'});
yticklabels({'3','4','5','6','7','8','9'});
cb = colorbar;cb.FontSize = fs_axis;cb.FontName = 'Arial';
cb.Ticks  = linspace(-3, 3, 7);cb.TickLabels = compose('%.0f', cb.Ticks);
cb.Title.String = 'Expected Value';cb.Title.FontSize = fs_title;cb.Title.FontName = 'Arial';
cb.Title.Units = 'normalized';
cb.Title.Position(2) = cb.Title.Position(2) + 0.05;

hold on
print(1, '-dtiff', [root_path,'\figure\FigureS1.tif'], '-r200');
close;
